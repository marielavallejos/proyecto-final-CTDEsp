import dayjs from "dayjs";

export const calculateTotalSum = (dataArray: any) => {
    let totalSum = 0;

    dataArray.forEach((entry: any) => {
        Object.values(entry).forEach((value: any) => {
            if (typeof value === 'number') {
                totalSum += value;
            }
        });
    });

    return totalSum.toFixed(2);
};

export const processesData = (dataArray: any) => {
    const monthlyData: { [month: string]: { [category: string]: number } } = {};
    const allCategories: Set<string> = new Set();

    dataArray.forEach((entry: any) => {
        const month = dayjs(entry.fechaPublicacion).format('MMM');
        const categoryName = entry.categoriasId.nombre;
        const amount = entry.montoSumatoriaDonaciones;

        // Almacena la categoría en el conjunto de todas las categorías
        allCategories.add(categoryName);

        if (!monthlyData[month]) {
            monthlyData[month] = {};
        }

        if (!monthlyData[month][categoryName]) {
            monthlyData[month][categoryName] = 0;
        }

        monthlyData[month][categoryName] += amount;
    });

    // Convierte el conjunto de categorías a un array
    const allCategoriesArray = Array.from(allCategories);

    // Define el orden predefinido de los meses
    const orderOfMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Ordena los meses de acuerdo con el orden predefinido
    const sortedMonths = orderOfMonths
        .map((month) => {
            const categoryTotals = monthlyData[month] || {};
            const entry: Record<string, number | string> = { month };

            allCategoriesArray.forEach((category) => {
                entry[category] = categoryTotals[category] || 0;
            });

            return entry;
        })
        .filter((entry) => {
            // Filtramos los meses que tienen todos los valores de categoría en 0
            const values = Object.values(entry).slice(1); // Excluimos el valor del mes
            return values.some((value) => value !== 0);
        });


    return sortedMonths;
};




export const generateChartDataByCategory = (dataArray: any[]) => {
    const chartData: { id: number; value: any; label: any; }[] = [];

    dataArray.forEach((entry) => {
        const categoryName = entry.categoriasId.nombre;

        const existingData = chartData.find((data) => data.label === categoryName);

        if (existingData) {
            existingData.value += entry.montoSumatoriaDonaciones;
        } else {
            chartData.push({ id: chartData.length, value: entry.montoSumatoriaDonaciones, label: categoryName });
        }
    });

    return chartData;
};