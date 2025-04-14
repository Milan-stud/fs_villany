using System.Diagnostics.CodeAnalysis;

namespace villany_szamla
{
    public class Consuption
    {
        public Consuption(double price, string input)
        {
            GetFirstYear(input);
            GetListOfYears(input);
            Price = price;
        }



        public void GetFirstYear(string input)
        {
            string[] stripped = input.Split("-");
            StartYear = int.Parse(stripped[0].Split(",")[0]);
        }

        public void GetListOfYears(string input)
        {

            Dictionary<int, double[]> data = new Dictionary<int, double[]>();


            string[] lines = input.Split('-');


            int[] years = Array.ConvertAll(lines[0].Split(','), int.Parse);


            for (int i = 0; i < years.Length; i++)
            {
                double[] monthlyUsage = new double[lines.Length - 1];
                for (int j = 1; j < lines.Length; j++)
                {
                    monthlyUsage[j - 1] = double.Parse(lines[j].Split(',')[i]);
                }
                data[years[i]] = monthlyUsage;
            }
            ListOfYears = data;
        }

        public int StartYear { get; set; }
        Dictionary<int, double[]> ListOfYears { get; set; }
        double Price { get; set; }
        public Dictionary<int, double[]> Cost
        {
            get
            {
                Dictionary<int, double[]> res = new Dictionary<int, double[]>();
                foreach (KeyValuePair<int, double[]> a in ListOfYears)
                {
                    res.Add(a.Key, a.Value.Select(x => double.Round(x * Price + 23.4, 2)).ToArray());
                }
                return res;
            }
        }
        public Dictionary<int, double> CostPerYear
        {
            get
            {
                Dictionary<int, double> res = new Dictionary<int, double>();
                double preSum = 0;

                foreach (var kvp in Cost)
                {
                    double currentSum = kvp.Value.Sum();
                    if (preSum > 350000)
                    {
                        currentSum *= 0.83;
                    }
                    res.Add(kvp.Key, double.Round(currentSum,2));
                    preSum = currentSum;
                }
                return res;
            }
        }
        public Dictionary<int,bool> HasReduction
        {
            get
            {
                Dictionary<int, bool> res = new Dictionary<int, bool>();
                double preSum = 0;

                foreach (var kvp in Cost)
                {
                    double currentSum = kvp.Value.Sum();
                    bool reduction = false;
                    if (preSum > 350000)
                    {
                        currentSum *= 0.83;
                        reduction = true;
                    }
                    res.Add(kvp.Key, reduction);
                    preSum = currentSum;
                }
                return res;
            }
        }
    }
}
