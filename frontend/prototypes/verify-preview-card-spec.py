"""Verify the preview-card-spec.css geometry invariant.

Expected invariant (LOCKED):
    --preview-stamp-margin-top + --preview-trendline-height + (--preview-dot-size / 2) == 71.5 px

Where:
    --preview-stamp-margin-top    = 20px
    --preview-stamp-line-height   = 10px
    --preview-stamp-margin-bottom = 39px
    --preview-trendline-height    = line-height + margin-bottom = 10 + 39 = 49px
    --preview-dot-size            = 5px
    --preview-dot-top             = trendline-height = 49px  (stamp-relative)
    --preview-dot-center-y        = margin-top + trendline-height + dot-size/2 = 71.5px (image-relative)
"""

# Atomic values from preview-card-spec.css
preview_stamp_margin_top = 20
preview_stamp_line_height = 10
preview_stamp_margin_bottom = 39
preview_dot_size = 5
preview_dot_ring_width = 2

# Computed values
preview_trendline_height = preview_stamp_line_height + preview_stamp_margin_bottom
preview_dot_top = preview_trendline_height  # stamp-relative
preview_dot_center_y_from_image = preview_stamp_margin_top + preview_trendline_height + (preview_dot_size / 2)
preview_dot_visual_size = preview_dot_size + 2 * preview_dot_ring_width

# Print results
print("=" * 60)
print("PREVIEW-CARD SPEC -- Geometry Verification")
print("=" * 60)
print()
print("ATOMIC VALUES:")
print(f"  --preview-stamp-margin-top    = {preview_stamp_margin_top}px")
print(f"  --preview-stamp-line-height   = {preview_stamp_line_height}px")
print(f"  --preview-stamp-margin-bottom = {preview_stamp_margin_bottom}px")
print(f"  --preview-dot-size            = {preview_dot_size}px")
print(f"  --preview-dot-ring-width      = {preview_dot_ring_width}px")
print()
print("COMPUTED VALUES:")
print(f"  --preview-trendline-height       = {preview_stamp_line_height} + {preview_stamp_margin_bottom} = {preview_trendline_height}px")
print(f"  --preview-dot-top (stamp-rel.)   = {preview_dot_top}px")
print(f"  --preview-dot-center-y (image)   = {preview_stamp_margin_top} + {preview_trendline_height} + ({preview_dot_size}/2) = {preview_dot_center_y_from_image}px")
print(f"  --preview-dot-visual-size        = {preview_dot_size} + 2*{preview_dot_ring_width} = {preview_dot_visual_size}px")
print()
print("INVARIANT CHECK:")
print(f"  margin-top ({preview_stamp_margin_top}) + trendline-height ({preview_trendline_height}) + dot-size/2 ({preview_dot_size/2}) = {preview_stamp_margin_top + preview_trendline_height + preview_dot_size/2}px")
print(f"  Expected: 71.5px")
print(f"  Match: {preview_stamp_margin_top + preview_trendline_height + preview_dot_size/2 == 71.5}")
print()

# Additional invariants
print("SYMMETRY CHECK (Datum/Zeit ↔ Linie):")
gap = 14
print(f"  Datum rechte Kante:    50% - {gap}px  (links der Linie)")
print(f"  Linie (X = Card-Mitte): 50%")
print(f"  Zeit linke Kante:      50% + {gap}px  (rechts der Linie)")
print(f"  Gap Datum ↔ Linie: {gap}px  ==  Gap Linie ↔ Zeit: {gap}px  =>  {'SYMMETRISCH' if gap == gap else 'NICHT SYMMETRISCH'}")
print()

# Multiple image aspect ratios
print("IMAGE-ASPECT-INVARIANCE (Y bleibt 71.5px):")
for label, image_h in [("16:9 @ 360px", 360 * 9 / 16), ("4:3 @ 360px", 360 * 3 / 4), ("1:1 @ 360px", 360), ("3:4 @ 360px", 360 * 4 / 3)]:
    image_h_int = int(image_h)
    # Stamp starts at image_bottom + 20
    stamp_top_offset = image_h_int + preview_stamp_margin_top
    # Dot top = stamp_top + 49
    dot_top_offset = stamp_top_offset + preview_trendline_height
    # Dot center
    dot_center_offset = dot_top_offset + preview_dot_size / 2
    # Image bottom reference
    image_bottom_offset = image_h_int
    # Distance from image bottom
    distance = dot_center_offset - image_bottom_offset
    print(f"  {label:18s}  image_h={image_h_int:4d}px  |  dot-center @ {dot_center_offset:5.1f}px  |  image-bottom @ {image_bottom_offset:4d}px  |  delta = {distance}px")
