import type { FnU } from "@thi.ng/api";
import type { IShape } from "@thi.ng/geom-api";
import type { ReadonlyVec } from "@thi.ng/vectors";

/**
 * Package-specific shape attributes used to control conversion behavior. MUST
 * be stored under the `__axi` attribute name.
 *
 * @example
 * ```ts
 * // a circle which will be drawn at 25% speed
 * circle(100, { __axi: { speed: 0.25 } });
 * ```
 */
export interface AxiDrawAttribs {
	/**
	 * Clip polygon vertices. See {@link AsAxiDrawOpts.clip}.
	 */
	clip: ReadonlyVec[];
	/**
	 * Optional speed factor (multiple of globally configured draw speed).
	 * Depending on pen used, slower speeds might result in thicker strokes.
	 */
	speed: number;
	/**
	 * Optional shape specific delay (in ms), e.g. hold time for pen down when
	 * stippling...
	 */
	delay: number;
	/**
	 * Optional pen down position (%).
	 */
	down: number;
	/**
	 * Ordering function (in lieu of full path planning/optimization, which is
	 * planned for a later stage). By default order of appearance is used.
	 *
	 * @remarks
	 * Currently available implementations:
	 *
	 * - {@link pointsByProximity} (for `points()`)
	 * - {@link shapesByProximity} (for `group()`)
	 */
	sort: PointOrdering | ShapeOrdering;
}

export type PointOrdering = FnU<ReadonlyVec[]>;

export type ShapeOrdering = FnU<IShape[]>;