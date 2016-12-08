namespace module {
    'use strict';

    angular.module('demo', [

    ]);


    export class ControllerController {
        static $inject: Array<string> = [];
        constructor(private dependency1) {
        }
    }

    angular.module('demo')
        .controller('myCtrl', ControllerController);
}


