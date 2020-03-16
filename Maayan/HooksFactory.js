'use strict';

import HooksRepository from './../src/modules/tools/client/components/hooks/HooksRepository'
//import loadable from '@loadable/component';
// import HooksList from "./HooksList"
export default class HooksFactory {
    hooksRepository = null;
    constructor() {
        this.hooksRepository = new HooksRepository();
        let modulesList = ["auth", "fileshandler"];
        let m = null;
        modulesList.forEach((moduleName) => {

            let moduleInstance = null;

            try {

                moduleInstance = require(`./${moduleName}_HooksList`).default;
                console.log("moduleInstance", moduleInstance)
                 new moduleInstance(this.hooksRepository).addHooks()

            


            } catch (err) {
                console.log("err from HooksFactory")
            }

        })



    }
    getRepository() {
        return this.hooksRepository;

    }
}