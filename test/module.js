/* global describe,before,it */
// testing the UMD (module loading capabilities)
describe('Testing UMD (Universal Module Definition) against /dist/html.sortable.js', function () {
  let assert = require('chai').assert
  let path = require('path')
  const { JSDOM } = require('jsdom')

  describe('AMD (Asynchronous module definition)', function () {
    before(function () {
      window = (new JSDOM(``, { runScripts: 'dangerously', url: 'file://'+process.cwd()+'/' })).window
      const requirejs = require('fs').readFileSync('./node_modules/requirejs/require.js', { encoding: 'utf-8' })
      const scriptEl = window.document.createElement('script')

      scriptEl.textContent = requirejs
      window.document.head.appendChild(scriptEl)
      scriptEl.textContent = `
        requirejs(['./dist/html.sortable'], function (sortable) {
          window.requiredSortable = sortable
          window.onModulesLoaded()
        })`
        window.document.head.appendChild(scriptEl)
    })

    it('should define sortable', function () {
      window.onModulesLoaded = () => {
        console.log("ready to roll!");
      };
      assert.typeOf(window.requirejs, 'function')
      assert.typeOf(window.requiredSortable, 'function')
    })
  })
})
