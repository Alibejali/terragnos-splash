/**
 * Public OS door — one switch for terragnos.com worksheet entry.
 *
 * closed: Beef, Sheep, and /herdflow redirects go to inquiries.
 * open (and any other value): those same controls go to app.terragnos.com
 * worksheet URLs. Only the exact word "closed" hides the public entrance.
 * A typo cannot take worksheets off the door. Closing is Ali GO (Std 13).
 *
 * Flip PUBLIC_OS_DOOR. Do not invent a second worksheet path. App
 * /herdflow and /herdflow-sheep stay. PR 308 (app twin) stays held.
 */
(function (root) {
  var PUBLIC_OS_DOOR = "open";
  var CONTACT = "https://terragnos.com/contact.html";
  var APP = "https://app.terragnos.com";
  var PATHS = { beef: "/herdflow", sheep: "/herdflow-sheep" };

  function worksheetEntryHref(kind, source) {
    var path = PATHS[kind];
    if (!path) return CONTACT;
    if (PUBLIC_OS_DOOR === "closed") return CONTACT;
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
