# Data Directory

## Structure
- `raw/` — original downloaded files, never edit these
- `processed/` — cleaned files ready for PostgreSQL
- `notebooks/` — exploration and wrangling scripts

## Raw Data Files

### AIHW Cancer Data
| File | Description | Used For |
|---|---|---|
| CDiA-2025-Book-1a (incidence age-standardised).xlsx | Cancer incidence 1982-2025 by age | US2.1 Chart 1 |
| CDiA-2025-Book-2a (mortality age-standardised).xlsx | Cancer mortality 1982-2025 by age | US2.1 Chart 2 |
| CDiA-2025-Book-1b (incidence 10yr age groups).xlsx | Cancer incidence by 10yr age groups | US2.1 Chart 1 |
| CDiA-2025-Book-7 (state and territory).xlsx | Cancer by state/territory | Victoria filter |

### ARPANSA UV Data
| File | Description | Used For |
|---|---|---|
| uv-melbourne-2020.csv | Melbourne UV index 2020 (1-min resolution) | US2.1 UV trends |
| uv-melbourne-2021.csv | Melbourne UV index 2021 (1-min resolution) | US2.1 UV trends |
| uv-melbourne-2022.csv | Melbourne UV index 2022 (1-min resolution) | US2.1 UV trends |
| uv-melbourne-2023.csv | Melbourne UV index 2023 (1-min resolution) | US2.1 UV trends |
| uv-melbourne-2024.csv | Melbourne UV index 2024 (1-min resolution) | US2.1 UV trends |

### Location Data
| File | Description | Used For |
|---|---|---|
| australian-postcodes.sql | Australian suburbs and postcodes | US1.1 location lookup |

## Processed Data
See `processed/README.md` once data wrangling is complete.

## Licenses
- AIHW data: Creative Commons Attribution 3.0 Australia
- ARPANSA data: Creative Commons Attribution 2.5 Australia
- Location data: GNU General Public License v3.0