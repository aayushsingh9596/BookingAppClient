import { hotelFacilities } from "../config/hotelOptionsConfig";

type Props = {
  selectedFacilties: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilties, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Facilities</h4>
      {hotelFacilities.map((facility) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={facility}
            checked={selectedFacilties.includes(facility)}
            onChange={onChange}
          />
          <span>{facility} Stars</span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
