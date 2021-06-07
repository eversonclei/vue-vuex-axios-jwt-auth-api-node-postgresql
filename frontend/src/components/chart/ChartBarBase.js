import { Bar, mixins } from 'vue-chartjs';

export default {
	extends: Bar,
	mixins: [mixins.reactiveProp],	
	props: ['chartData'],
	data() {
		return {
			options: {
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true
							}
						}
					]
				},
				responsive: true,

				maintainAspectRatio: false,

				plugins: {
					legend: false,
				}				
			}
		}
	},
	mounted() {
		this.renderChart(this.chartData, this.options);
	}
};