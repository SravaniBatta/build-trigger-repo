import {test} from './fixture';

test('fixture test1',async({helloWorld,helloworld2})=>{

    console.log(helloWorld);
    console.log(helloworld2);
    console.log("testing fixture1");

})

test('fixture test2',async({helloWorld})=>{
    console.log(helloWorld);

    console.log('testing fixture2')
})
