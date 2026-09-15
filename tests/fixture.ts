import {test as base} from '@playwright/test';

type myFixture={
helloWorld :String;
helloworld2:String;
}


export const test=base.extend<myFixture>({

    helloWorld:async({}, use) => {
      
        const myworld='Hello, World!';
        await use(myworld);

    },

    helloworld2: async({},use)=>{

        const myworld2='Hello, World2!';
        await use(myworld2);

    }

})