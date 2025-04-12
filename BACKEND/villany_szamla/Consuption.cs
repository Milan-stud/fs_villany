namespace villany_szamla
{
    public class Consuption
    {
        public static int[] AddArray(int[] array)
        {
            if (array.Length != 12)
            {
                throw new ArgumentException("Only 12 length array accepted");
            }
            return array;
        }

        public static int GetFirstYear(string input)
        {
            string[] stripped = input.Split("\n");
            return int.Parse(stripped[0].Split(",")[0]);
        }

        public static List<double[]> GetListOfYears(double price, string input)
        {
            string[] stripped = input.Split("\n");
            List<double[]> res = new List<double[]>();
            for (int i = 1; i < stripped.Length; i++)
            {
                double[] temp = new double[12];
                for (int j = 0; j < temp.Length; j++)
                {
                    temp[j] = double.Parse(stripped[i].Split(",")[j])*price+23.4 ;
                }
                res.Add(temp);
            }
            return res;
        }

        public int StartYear { get; set; }
        public List<double[]> ListOfYears { get; set; }
    }
}
