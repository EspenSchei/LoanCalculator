var app = angular.module('myApp', ['ngMessages']);

app.controller('calculatorCtrl', function($scope, $http) {
	
	$scope.formData = {
		loanAmount : 2560000,
		interestRate : 3.45,
		downPaymentYears : 20,
	};
	
	$scope.years = _.range(1, 41);

	$scope.calculateLoan = function(form) {
		var date = new Date();
		var args = "loanRaisingMonth=" + (date.getMonth() + 1)
				+ "&loanRaisingYear=" + date.getFullYear()
				+ "&principalAmount=" + $scope.formData.loanAmount
				+ "&annualNominalInterestRate=" + $scope.formData.interestRate
				+ "&totalNumberOfPayments=" + $scope.formData.downPaymentYears * 12;

		if(form.$valid || form.$valid == undefined) {
			$http.jsonp("https://cfs-ws-itera.cicero.no/cfp/6/ws/rest/calculator/calculateLoan?_jsonp=JSON_CALLBACK&" + args)
				.success(function(data) {
					var schedules = _.first($(data)).amortizationSchedule;
					$scope.payment = Math.round(_.first(schedules).payment);
				});
		}
	}

	$scope.calculateLoan(calculatorForm);
});