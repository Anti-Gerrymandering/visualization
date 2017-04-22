# About metadata.json

The file serves as a reference for all the available files for the project including things such as years, districts, demographics, etc.

All data was sourced from public data government data:

The GeoJSON files were sourced from shapefiles and converted using [gdal](http://www.gdal.org/) following this [tutorial](http://ben.balter.com/2013/06/26/how-to-convert-shapefiles-to-geojson-for-use-on-github/). For consistency, this project used 500k or 1:500,000 for its resolution.

- [P.A. State House & Senate](https://www.census.gov/geo/maps-data/data/cbf/cbf_sld.html)
- [P.A. Federal House](https://www.census.gov/geo/maps-data/data/cbf/cbf_cds.html) -> __This data was reduced from national district file down to a simple state/P.A. file still dealing with the U.S. House districts__


The schema here is still being refactored and onced finalized will be posted below
    // Schema to come