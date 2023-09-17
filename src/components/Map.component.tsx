import { Polygon, MultiPolygon } from "geojson";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { fetchStateDetails } from "../api/state";
import { CENTER_LONLAT } from "../constants";

const Map = ({ selectedState }: { selectedState: number | undefined }) => {
  const [geoJsondata, setGeoJsondata] = useState<Polygon | MultiPolygon | null>(
    null
  );

  useEffect(() => {
    if (selectedState) {
      (async () => {
        setGeoJsondata(() => null);
        const result = await fetchStateDetails(selectedState);
        setGeoJsondata(() => result.boundary);
      })();
    }
  }, [selectedState]);

  return (
    <MapContainer
      center={CENTER_LONLAT}
      zoom={4}
      scrollWheelZoom={true}
      style={{ minHeight: "100%", minWidth: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoJsondata && <GeoJSON data={geoJsondata} />}
    </MapContainer>
  );
};

export default Map;
