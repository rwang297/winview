import { FilterIcon, ShieldCheck } from 'lucide-react';
import { FilterDropdown } from './FilterDropdown';

export function FiltersRow({
  rank,
  setRank,
  payPoint,
  setPayPoint,
  stateFilter,
  setStateFilter,
  hasPoliceId,
  setHasPoliceId,
  ranks,
  payPoints,
  states,
}) {
  return (
    <>
      <FilterDropdown
        label="Rank"
        value={rank}
        onChange={setRank}
        options={[{ value: '', label: 'All ranks' }, ...ranks.map((r) => ({ value: r, label: r }))]}
      />

      <FilterDropdown
        label="Pay Point"
        value={payPoint}
        onChange={setPayPoint}
        options={[
          { value: '', label: 'All pay points' },
          ...payPoints.map((p) => ({ value: p, label: p })),
        ]}
      />

      <FilterDropdown
        label="State"
        value={stateFilter}
        onChange={setStateFilter}
        options={[
          { value: '', label: 'All states' },
          ...states.map((s) => ({ value: s, label: s })),
        ]}
      />

      <FilterDropdown
        label="Police ID"
        value={hasPoliceId}
        onChange={setHasPoliceId}
        icon={ShieldCheck}
        options={[
          { value: '', label: 'All' },
          { value: 'true', label: 'Yes' },
          { value: 'false', label: 'No' },
        ]}
      />
    </>
  );
}
