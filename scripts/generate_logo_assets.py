#!/usr/bin/env python3
"""Generate outlined Snackdaddy and BR-OATS SVG logo masters."""

from __future__ import annotations

import json
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "brand"
NEXT_FONT_DIR = ROOT / ".next" / "static" / "media"

YELLOW = "#FFD400"
BLACK = "#10110E"


def font_family(font: TTFont) -> str:
    for record in font["name"].names:
        if record.nameID == 1:
            return record.toUnicode()
    return ""


def find_font(family: str) -> Path:
    candidates: list[tuple[int, Path]] = []
    for path in NEXT_FONT_DIR.glob("*.woff2"):
        font = TTFont(path)
        if font_family(font) == family:
            candidates.append((len(font.getGlyphOrder()), path))
    if not candidates:
        raise FileNotFoundError(
            f"Could not find {family}. Run `npm run build` before regenerating assets."
        )
    return max(candidates)[1]


SNACKDADDY_FONT = Path("/System/Library/Fonts/Supplemental/Arial Rounded Bold.ttf")
BROATS_FONT = find_font("Barlow Condensed Black")


def outlined_text(
    text: str,
    font_path: Path,
    em_height: float,
    tracking: float,
    weight: float,
):
    font = TTFont(font_path)
    if "fvar" in font:
        font = instantiateVariableFont(font, {"wght": weight}, inplace=False)
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    hmtx = font["hmtx"]
    units_per_em = font["head"].unitsPerEm
    ascent = font["hhea"].ascent
    descent = font["hhea"].descent
    scale = em_height / units_per_em
    baseline = ascent * scale
    height = (ascent - descent) * scale

    x = 0.0
    paths: list[str] = []
    for character in text:
        glyph_name = cmap.get(ord(character))
        if glyph_name is None:
            raise ValueError(f"Missing glyph for {character!r} in {font_path}")
        glyph = glyph_set[glyph_name]
        pen = SVGPathPen(glyph_set)
        glyph.draw(pen)
        commands = pen.getCommands()
        if commands:
            paths.append(
                f'<path d="{commands}" transform="translate({x:.3f} {baseline:.3f}) '
                f'scale({scale:.7f} {-scale:.7f})"/>'
            )
        x += hmtx[glyph_name][0] * scale + tracking

    width = max(1.0, x - tracking)
    return "".join(paths), width, height


def svg_document(
    title: str,
    paths: str,
    width: float,
    height: float,
    foreground: str,
    background: str | None = None,
    padding: float = 18,
    radius: float = 28,
) -> str:
    canvas_width = width + padding * 2
    canvas_height = height + padding * 2
    backdrop = (
        f'<rect width="{canvas_width:.3f}" height="{canvas_height:.3f}" '
        f'rx="{radius}" fill="{background}"/>'
        if background
        else ""
    )
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {canvas_width:.3f} {canvas_height:.3f}" role="img" aria-labelledby="title">
  <title id="title">{title}</title>
  {backdrop}
  <g fill="{foreground}" transform="translate({padding} {padding})">{paths}</g>
</svg>
'''


def mark_document(title: str, foreground: str, background: str) -> str:
    paths, width, height = outlined_text("sd.", SNACKDADDY_FONT, 230, -13, 850)
    x = (512 - width) / 2
    y = (512 - height) / 2
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-labelledby="title">
  <title id="title">{title}</title>
  <rect width="512" height="512" rx="122" fill="{background}"/>
  <g fill="{foreground}" transform="translate({x:.3f} {y:.3f})">{paths}</g>
</svg>
'''


def lockup_document() -> str:
    logo_paths, logo_width, logo_height = outlined_text("BR-OATS", BROATS_FONT, 154, -2, 900)
    sub_paths, sub_width, sub_height = outlined_text("OVERNIGHT OATS", BROATS_FONT, 38, 5, 700)
    padding_x = 34
    padding_y = 30
    gap = 12
    canvas_width = max(logo_width, sub_width) + padding_x * 2
    canvas_height = logo_height + gap + sub_height + padding_y * 2
    logo_x = (canvas_width - logo_width) / 2
    sub_x = (canvas_width - sub_width) / 2
    sub_y = padding_y + logo_height + gap
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {canvas_width:.3f} {canvas_height:.3f}" role="img" aria-labelledby="title">
  <title id="title">BR-OATS overnight oats lockup</title>
  <rect width="{canvas_width:.3f}" height="{canvas_height:.3f}" rx="30" fill="{BLACK}"/>
  <g fill="{YELLOW}" transform="translate({logo_x:.3f} {padding_y})">{logo_paths}</g>
  <g fill="{YELLOW}" transform="translate({sub_x:.3f} {sub_y:.3f})">{sub_paths}</g>
</svg>
'''


def write(name: str, content: str) -> None:
    (OUT / name).write_text(content, encoding="utf-8")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    snack_paths, snack_width, snack_height = outlined_text(
        "snackdaddy.", SNACKDADDY_FONT, 124, -8, 850
    )
    broats_paths, broats_width, broats_height = outlined_text(
        "BR-OATS", BROATS_FONT, 164, -2, 900
    )

    write(
        "snackdaddy-wordmark-black.svg",
        svg_document("Snackdaddy logo", snack_paths, snack_width, snack_height, BLACK),
    )
    write(
        "snackdaddy-wordmark-yellow.svg",
        svg_document("Snackdaddy logo", snack_paths, snack_width, snack_height, YELLOW),
    )
    write(
        "snackdaddy-wordmark-reversed.svg",
        svg_document(
            "Snackdaddy reversed logo",
            snack_paths,
            snack_width,
            snack_height,
            YELLOW,
            BLACK,
        ),
    )
    write(
        "br-oats-wordmark-black.svg",
        svg_document("BR-OATS logo", broats_paths, broats_width, broats_height, BLACK),
    )
    write(
        "br-oats-wordmark-yellow.svg",
        svg_document("BR-OATS logo", broats_paths, broats_width, broats_height, YELLOW),
    )
    write("br-oats-lockup-reversed.svg", lockup_document())
    write("snackdaddy-mark-yellow.svg", mark_document("Snackdaddy mark", BLACK, YELLOW))
    write("snackdaddy-mark-black.svg", mark_document("Snackdaddy reversed mark", YELLOW, BLACK))

    favicon = mark_document("Snackdaddy mark", BLACK, YELLOW)
    (ROOT / "public" / "favicon.svg").write_text(favicon, encoding="utf-8")

    manifest = {
        "brand": "Snackdaddy / BR-OATS",
        "colors": {"yellow": YELLOW, "black": BLACK},
        "typography": {
            "primary": "Geist",
            "display": "Barlow Condensed",
            "brandMark": "Snackdaddy custom rounded lettering",
            "logoWeights": {"brOats": 900},
        },
        "svgMasters": sorted(path.name for path in OUT.glob("*.svg")),
        "pngExports": sorted(
            path.name.replace(".svg", ".png") for path in OUT.glob("*.svg")
        ),
    }
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
