/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*-
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

const builtinThemeIconData = {
    "newTabIcon":{
        "selector":"#tabs-newtab-button, #new-tab-button",
        "styleKey":"listStyleImage"
    }
}

let lastIconpackData = []
function iconpackUpdate(iconData_) {
    let iconData = iconData_.wrappedJSObject
    if (lastIconpackData.length != 0) {
        lastIconpackData.forEach((elem) => {
            if (elem.type == "floorp") {
                iconpackSetting(elem.name, "floorp", "", "")

            }
        })
    }
    lastIconpackdata = []

    if(iconData != {} && iconData.icons != {}){
        for(const iconKey in iconData.icons){
            if(iconKey in builtinThemeIconData){
                iconpackSetting(iconKey,"floorp","",iconData.icons[iconKey])
                lastIconpackData.push({"name":iconKey,"type":"floorp"})
            }
        }
    }


}

function iconpackSetting(iconSelector, iconSelectorType, iconStyleName, iconValue) {
    if (iconSelectorType == "floorp") {
        for (const elem of document.querySelectorAll(builtinThemeIconData[iconSelector].selector)) {
            elem.style[builtinThemeIconData[iconSelector].styleKey] = escapeIconpackURL(iconValue)
        }

    }
}


function escapeIconpackURL(url) {
    return url == "" ? "" : `url(${window.CSS.escape(url)})`
}

Services.obs.addObserver(iconpackUpdate, "iconpack-update");