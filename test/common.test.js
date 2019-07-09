test('test slice', ()=>{
  const str = "/opt/hdsp";
  expect(str.substring("/opt".length + 1).split("/")).toEqual(["hdsp"]);
});