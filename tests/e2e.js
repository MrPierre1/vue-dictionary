var config = require("../nightwatch.conf.BASIC.js");
var app_url = "http://localhost:5000/";

module.exports = {
  "I can search for a word": function(browser) {
    browser.url(app_url).setValue("input", "dearth");
    browser
      .keys([browser.Keys.RETURN])
      .assert.containsText("div h2", "Scarcity")
      .assert.containsText("div ul li", "dearth".toUpperCase())
      .end();
  },
  "I can search for word that doesnt exist": function(browser) {
    browser.url(app_url).setValue("input", "wordThatDoesntExist");
    browser
      .keys([browser.Keys.RETURN])
      .assert.containsText(
        "div h2",
        "We could not find your word, please try another"
      )
      .elements("css selector", "ul li", result => {
        const numOfElements = result.value.length;
        browser.assert.equal(numOfElements, 0);
      })
      .end();
  },
  "I can search for another word": function(browser) {
    browser.url(app_url).setValue("input", "trophied");
    browser
      .keys([browser.Keys.RETURN])
      .assert.containsText("div h2", "Adorned with trophies")
      .assert.containsText("div ul li", "trophied".toUpperCase())
      .end();
  },

  "I can search history for my word": function(browser) {
    browser.url(app_url).setValue("input", "trophied");
    browser
      .keys([browser.Keys.RETURN])
      .clearValue("input")
      .setValue("input", "dearth");
    browser
      .keys([browser.Keys.RETURN])
      .click("li a")
      .assert.containsText("div h2", "Adorned with trophies")
      .assert.containsText("div ul li", "trophied".toUpperCase())
      .end();
  }
};
