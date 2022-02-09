import weightsReducer, {
  fetchLatestWeight,
  saveWeight,
  SaveWeightDTO,
} from './weights.slice';

export { fetchLatestWeight, saveWeight };
export type { SaveWeightDTO };
export default weightsReducer;
