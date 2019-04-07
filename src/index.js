(async () => {
  await new Promise(resolve => window.addEventListener('load', resolve));

  console.log('hello');
})();
