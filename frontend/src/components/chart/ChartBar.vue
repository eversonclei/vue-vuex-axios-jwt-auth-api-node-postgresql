<template>
    <div class="chart">
        <b-card title="Vendas Semanal">
            <ChartBarBase :chart-data="chartData" />
        </b-card>
    </div>
</template>

<script>
import ChartBarBase from "@/components/chart/ChartBarBase";

export default {
    components: {
        ChartBarBase
    },
    data() {
        return {
            chartData: {} 
        };
    },
    mounted() {
        this.fillData();
    },
    methods: {
        fillData() {
            // Mock local
            this.chartData = {
                labels: ["SEG", "TER", "QUA", "QUI", "SEX", "SAB"],
                datasets: [
                    {
                        backgroundColor: "#98ddde",
                        borderColor: "#030c0c",
                        data: [15500, 45300, 23750, 9000, 14800, 7000],
                        label: "Total"
                    }   
                ]
            };
        }
    }
};
</script>

<style>
    .chart {
        flex: 1;
        display: grid;
        border-radius: 8px;
        margin-right: 10px;
        margin-bottom: 20px;
        background-color: #fff;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }
</style>