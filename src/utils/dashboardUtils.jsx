// Calculate dashboard statistics
export const calculateStats = (merchants) => {
  const activeMerchants = merchants.filter((m) => m.status === "active").length;
  const highRisk = merchants.filter((m) => m.risk === "high").length;
  const totalVolume = merchants.reduce((sum, m) => sum + m.volume, 0);

  // Calculate avg success rate (100 - avg chargeback)
  const avgChargeback =
    merchants.length > 0
      ? merchants.reduce((sum, m) => sum + m.chargeback, 0) / merchants.length
      : 0;
  const avgSuccessRate = (100 - avgChargeback).toFixed(1) + "%";

  return {
    totalVolume: `$${(totalVolume / 1000000).toFixed(1)}M`,
    avgSuccessRate,
    activeMerchants,
    highRisk,
  };
};

// Get volume by country (top 6 countries)
export const getVolumeByCountry = (merchants) => {
  const countryVolumes = {};

  merchants.forEach((m) => {
    const vol = Number(m.volume) || 0;
    countryVolumes[m.country] = (countryVolumes[m.country] || 0) + vol;
  });

  return Object.entries(countryVolumes)
    .map(([country, volume]) => ({ country, volume }))
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 6);
};

// Get risk distribution
export const getRiskDistribution = (merchants) => {
  const riskCounts = merchants.reduce((acc, m) => {
    acc[m.risk] = (acc[m.risk] || 0) + 1;
    return acc;
  }, {});

  return ["low", "medium", "high"].map((risk) => ({
    risk,
    count: riskCounts[risk] || 0,
  }));
};


