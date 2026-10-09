/**
 * Public OS door — one switch for terragnos.com worksheet entry.
 *
 * closed: Beef, Sheep, and /herdflow redirects go to inquiries.
 * open: those same controls go to app.terragnos.com worksheet URLs.
 *
 * Flip PUBLIC_OS_DOOR. Do not invent a second worksheet path. App
 * /herdflow and /herdflow-sheep stay. Pair with PUBLIC_OS_DOOR in
 * terragnos shared/livestockWorksheet/publicFaces.ts when opening.
 */
(function (root) {
  var PUBLIC_OS_DOOR = "open";
  var CONTACT = "https://terragnos.com/contact.html";
  var APP = "https://app.terragnos.com";
  var PATHS = { beef: "/herdflow", sheep: "/herdflow-sheep" };

  function worksheetEntryHref(kind, source) {
    var path = PATHS[kind];
    if (!path) return CONTACT;
    if (PUBLIC_OS_DOOR !== "open") return CONTACT;
    var tag = source === "qr" ? "qr" : "web";
    return APP + path + "?src=" + tag;
  }

  function applyOsDoor() {
    var nodes = document.querySelectorAll("[data-os-door]");
    for (var i = 0; i < nodes.length; i++) {
      var source = nodes[i].getAttribute("data-os-source") || "web";
      nodes[i].setAttribute("href", worksheetEntryHref(nodes[i].getAttribute("data-os-door"), source));
    }
  }

  root.TERRAGNOS_PUBLIC_OS_DOOR = PUBLIC_OS_DOOR;
  root.terragnosWorksheetEntryHref = worksheetEntryHref;
  root.terragnosApplyOsDoor = applyOsDoor;
})(window);
