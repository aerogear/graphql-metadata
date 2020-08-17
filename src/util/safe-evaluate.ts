import  { VM } from 'vm2';

export function safeEvaluate(value: string): Object {
  const vm = new VM({
    timeout: 1000 * 60, // timeout after a minute to avoid infite loops etc
    sandbox: {
      metadata: undefined // this will contain the result
    }
  });

  vm.run(`metadata = ${value};`) // initialise the result in the script
  return vm.sandbox.metadata;
}
