define(['lib/angular'],function(){

    var phonecatApp = angular.module('phonecatApp', []);

    phonecatApp.controller('PhoneListCtrl', function($scope) {
        $scope.phones = [
            {'name': 'Nexus S',
                'snippet': 'Fast just got faster with Nexus S.'},
            {'name': 'Motorola XOOM? with Wi-Fi',
                'snippet': 'The Next, Next Generation tablet.'},
            {'name': 'MOTOROLA XOOM?',
                'snippet': 'The Next, Next Generation tablet.'}
        ];
    });

   // return phonecatApp
   /* var add = function(x,y){
        return x+y;
    };
    return {
        add:add
    }*/
});