#!/usr/bin/env bash
# Fail-open door: only exact "closed" may hide splash worksheet entry.
# Ali GO SPLASH 2026-10-11. Closing the door is a named GO (Std 13).
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
js="$root/public-os-door.js"

grep -q 'var PUBLIC_OS_DOOR = "open"' "$js"
grep -q 'if (PUBLIC_OS_DOOR === "closed") return CONTACT' "$js"
if grep -q 'PUBLIC_OS_DOOR !== "open"' "$js"; then
  echo "door-failopen-check: hide test must not be !== open" >&2
  exit 1
fi

DOOR_JS="$js" node --input-type=module <<'EOF'
import { readFileSync } from "node:fs";
import vm from "node:vm";
const js = process.env.DOOR_JS;
const window = {};
vm.runInNewContext(readFileSync(js, "utf8"), {
  window,
  document: { querySelectorAll: () => [] },
});
const beef = window.terragnosWorksheetEntryHref("beef", "qr");
const sheep = window.terragnosWorksheetEntryHref("sheep", "web");
if (!String(beef).includes("app.terragnos.com/herdflow?src=qr")) {
  throw new Error("open door must send QR beef to the worksheet");
}
if (!String(sheep).includes("app.terragnos.com/herdflow-sheep?src=web")) {
  throw new Error("open door must send web sheep to the worksheet");
}
if (String(beef).includes("contact.html") || String(sheep).includes("contact.html")) {
  throw new Error("open door must not send worksheets to Notify");
}
if (window.TERRAGNOS_PUBLIC_OS_DOOR !== "open") {
  throw new Error("live flag must stay open");
}
console.log("door-failopen-check: OK");
EOF
