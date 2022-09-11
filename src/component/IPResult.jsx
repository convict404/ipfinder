import { MapContainer, Marker, TileLayer } from "react-leaflet";

function IPResult({ locationData }) {
  const { data } = locationData;
  const position = [data.latitude, data.longitude];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-4 max-w-sm md:max-w-xl lg:max-w-4xl mx-auto">
      <div className="text-center lg:text-left lg:w-1/2 lg:pr-6">
        <h3 className="text-lg text-secondary-content border-b-2 border-dashed border-b-accent mt-4">
          Lookup Information
        </h3>

        <div className="text-md mt-2 text-secondary-content lg:mt-6">
          <span className="font-bold">IP Address: </span>
          <span className="">{data.ip}</span>
        </div>

        <div className="text-md mt-2 text-secondary-content">
          <span className="font-bold">City: </span>
          <span className="">{data.city}</span>
        </div>

        <div className="text-md mt-2 text-secondary-content">
          <span className="font-bold">Region: </span>
          <span className="">{data.state_prov}</span>
        </div>

        <div className="text-md mt-2 text-secondary-content">
          <span className="font-bold">Country: </span>
          <span className="">
            {data.country_name}, {data.country_code2}
          </span>
        </div>

        <div className="text-md mt-2 text-secondary-content">
          <span className="font-bold">Longitude: </span>
          <span className="">{data.longitude}</span>
        </div>

        <div className="text-md mt-2 text-secondary-content">
          <span className="font-bold">Latitude: </span>
          <span className="">{data.latitude}</span>
        </div>

        <div className="text-md mt-2 text-secondary-content">
          <span className="font-bold">ISP: </span>
          <span className="">{data.isp}</span>
        </div>

        <div className="text-md mt-2 text-secondary-content">
          <span className="font-bold">Organisation: </span>
          <span className="">{data.organization}</span>
        </div>
      </div>

      <div className="map lg:w-1/2 lg:h-96 lg:mt-12 mt-10 mx-6 h-60">
        <MapContainer
          className="h-full"
          center={position}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} />
        </MapContainer>
      </div>
    </div>
  );
}

export default IPResult;
