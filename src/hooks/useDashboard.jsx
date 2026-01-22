import { useMemo } from "react";
import { merchantService } from "../services/merchantService";
import {
  calculateStats,
  getVolumeByCountry,
  getRiskDistribution,
} from "../utils/dashboardUtils";

export const useDashboard = () => {
  const merchants = merchantService.getAllMerchants();

  const stats = useMemo(() => calculateStats(merchants), [merchants]);

  const volumeByCountry = useMemo(
    () => getVolumeByCountry(merchants),
    [merchants],
  );

  const riskDistribution = useMemo(
    () => getRiskDistribution(merchants),
    [merchants],
  );

  return {
    stats,
    volumeByCountry,
    riskDistribution,
  };
};
