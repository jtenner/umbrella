import { SIZEOF, Type } from "@thi.ng/api/typedarray";
import type { Pow2 } from "@thi.ng/binary";
import { align } from "@thi.ng/binary/align";
import { ceilPow2 } from "@thi.ng/binary/pow";
import { compareByKey } from "@thi.ng/compare/keys";
import { compareNumDesc } from "@thi.ng/compare/numeric";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import {
	Enum,
	ICodeGen,
	PKG_NAME,
	Struct,
	StructField,
	TopLevelType,
	TypeColl,
	USIZE_SIZE,
} from "./api.js";
import { isNumeric } from "./codegen/utils.js";

export interface CodeGenOpts {
	/**
	 * Optional string to be injected before generated type defs (but after
	 * codegen's own prelude, if any)
	 */
	pre: string;
	/**
	 * Optional string to be injected after generated type defs (but before
	 * codegen's own epilogue, if any)
	 */
	post: string;
}

const sizeOf = defmulti<TopLevelType | StructField, TypeColl, number>(
	(x) => x.type,
	{},
	{
		[DEFAULT]: (field: StructField, types: TypeColl) => {
			if (field.__size) return field.__size;
			let size = 0;
			if (field.tag === "ptr") {
				size = USIZE_SIZE;
			} else if (field.tag === "slice") {
				size = USIZE_SIZE * 2;
			} else {
				size = isNumeric(field.type)
					? SIZEOF[<Type>field.type]
					: sizeOf(types[field.type], types);
				if (field.tag == "array" || field.tag === "vec") {
					size *= field.len!;
				}
			}
			return (field.__size = align(size, <Pow2>field.__align));
		},

		enum: (type) => {
			if (type.__size) return type.__size;
			return (type.__size = SIZEOF[(<Enum>type).tag]);
		},

		struct: (type, types) => {
			if (type.__size) return type.__size;
			const struct = <Struct>type;
			let size = 0;
			for (let f of struct.fields) {
				size = align(size, <Pow2>f.__align!);
				f.__offset = size;
				size += sizeOf(f, types);
			}
			return (type.__size = align(size, <Pow2>type.__align!));
		},
	}
);

const alignOf = defmulti<TopLevelType | StructField, TypeColl, number>(
	(x) => x.type,
	{},
	{
		[DEFAULT]: (field: StructField, types: TypeColl) => {
			if (field.__align) return field.__align;
			let align = isNumeric(field.type)
				? SIZEOF[<Type>field.type]
				: alignOf(types[field.type], types);
			if (field.tag === "vec") {
				align *= ceilPow2(field.len!);
			}
			field.__align = align;
			return align;
		},

		enum: (e) => {
			return (e.__align = SIZEOF[(<Enum>e).tag]);
		},

		struct: (type, types) => {
			const struct = <Struct>type;
			let maxAlign = 0;
			for (let f of struct.fields) {
				maxAlign = Math.max(maxAlign, alignOf(f, types));
			}
			return (type.__align = maxAlign);
		},
	}
);

const prepareType = defmulti<TopLevelType, TypeColl, void>(
	(x) => x.type,
	{},
	{
		[DEFAULT]: (x: TopLevelType, types: TypeColl) => {
			if (x.__align && x.__size) return;
			alignOf(x, types);
			sizeOf(x, types);
		},
		struct: (x, types) => {
			if (x.__align && x.__size) return;
			const struct = <Struct>x;
			alignOf(struct, types);
			if (struct.auto) {
				struct.fields.sort(
					compareByKey("__align", <any>compareNumDesc)
				);
			}
			for (let f of struct.fields) {
				if (types[f.type]) {
					prepareType(types[f.type], types);
				}
			}
			sizeOf(struct, types);
		},
	}
);

export const prepareTypes = (types: TypeColl) => {
	for (let id in types) {
		prepareType(types[id], types);
	}
};

export const generateTypes = (
	types: TypeColl,
	codegen: ICodeGen,
	opts: Partial<CodeGenOpts> = {}
) => {
	prepareTypes(types);
	const res: string[] = [];
	codegen.doc(
		`Generated by ${PKG_NAME} at ${new Date().toISOString()} - DO NOT EDIT!`,
		"",
		res,
		true
	);
	res.push("");
	codegen.pre && res.push(codegen.pre, "");
	opts.pre && res.push(opts.pre, "");
	for (let id in types) {
		const type = types[id];
		type.doc && codegen.doc(type.doc, "", res);
		codegen[type.type](<any>type, types, res);
	}
	opts.post && res.push("", opts.post);
	codegen.post && res.push("", codegen.post);
	return res.join("\n");
};