const FIVE_SECONDS = 5000;
const TEN_SECONDS = 10000;

const cookieNodeIds = [
    { nodeId: "\u0042\u006f\u0072\u006c\u0061\u0062\u0073\u0043\u006f\u006f\u006b\u0069\u0065\u0042\u006f\u0078" },
    { nodeId: "cookieBanner" },
    { nodeId: "cookieNotification" },
    { nodeId: "gdpr-popup" },
    { nodeId: "popup-cookieConsent" },
    { nodeId: "lb", urlPattern: /^https?:\/\/(?:www\.)\u0067\u006f\u006f\u0067\u006c\u0065.\u0064\u0065/ }
];

const cookieNodeClasses = [
    { clazz: "page-wrap--cookie-permission" },
    { clazz: "gdpr-cookieconsent-overlay" },
    { clazz: "gdpr-cookieconsent-settings" },
    { clazz: "cookie-policy" }
];

const customAttributes = [
    { selector: "div[aria-label='cookieconsent']" },
    { selector: "div[data-testid='gdpr-dock']" }
]

function ignoreByURLpattern( info ) {
    if(null!==info.urlPattern) {
        if(null===document.URL.match(info.urlPattern)) {
            return true;
        }
    }
    return false;
}

function removeById( elementId ) {
    if(null!==elementId.urlPattern) {
        if(null===document.URL.match(elementId.urlPattern)) {
            return;
        }
    }
    let element = document.getElementById(elementId.nodeId);
    if(null!==element) {
        element.remove();
    }
}

function removeByClassname( clazzInfo ) {
    if(null!==clazzInfo.urlPattern) {
        if(null===document.URL.match(clazzInfo.urlPattern)) {
            return;
        }
    }
    let nodelist = document.getElementsByClassName(clazzInfo.clazz);
    if(null!==nodelist) {
        for( let node of nodelist ) {
            node.remove();
        }
    }    
}

function removeByAttribute( attributeInfo ) {
    if(ignoreByURLpattern(attributeInfo)) {
        return;
    }
    let nodelist = document.querySelectorAll(attributeInfo.selector);
    if(null!==nodelist) {
        for( let node of nodelist ) {
            node.remove();
        }
    }
}

function scanWebpage() {
    cookieNodeIds.forEach(idInfo => removeById(idInfo));
    cookieNodeClasses.forEach( clazzInfo => removeByClassname(clazzInfo));
    customAttributes.forEach( attributeInfo => removeByAttribute(attributeInfo));
}

scanWebpage();
setTimeout( () => scanWebpage(), FIVE_SECONDS);
