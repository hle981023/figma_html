/*
 * SnapRatio.jsx  —  Illustrator 사이즈 정리 에이전트 (MVP)
 * 선택한 오브젝트를 "비율 유지 + 소수점 없는 정수 사이즈"로 스냅합니다.
 * 기준점: 좌상단 고정 / stroke 무시(geometricBounds 기준)
 *
 * 사용법:
 *   1) 일러스트에서 오브젝트 하나 선택
 *   2) 파일 > 스크립트 > 다른 스크립트… 에서 이 파일 실행
 *      (또는 [일러스트 설치폴더]/Presets/ko_KR/스크립트/ 에 넣으면 메뉴에 고정)
 */

#target illustrator

(function () {
    // ---------- 유닛 환산 (Illustrator 내부 단위 = point) ----------
    var PT = { mm: 2.834645669291339, pt: 1, px: 1, "in": 72 };

    // ---------- 비율 유지 정수비 로직 (목업과 동일) ----------
    function gcd(a, b) { a = Math.round(a); b = Math.round(b); while (b) { var t = b; b = a % b; a = t; } return a; }

    function simplestRatio(r) {
        var maxQ = 40, tol = 0.02, q, p, g;
        for (q = 1; q <= maxQ; q++) {
            p = Math.round(r * q);
            if (p < 1) continue;
            if (Math.abs(p / q - r) / r <= tol) { g = gcd(p, q); return { p: p / g, q: q / g }; }
        }
        p = Math.round(r * 100); q = 100; g = gcd(p, q);
        return { p: p / g, q: q / g };
    }

    // 선택 unit 기준의 정수 사이즈 후보 생성 (편차 오름차순 상위 4개)
    function buildOptions(wU, hU) {
        var r = wU / hU, sr = simplestRatio(r), p = sr.p, q = sr.q;
        var kC = (wU / p + hU / q) / 2, ks = {}, list = [], k, d, w, h, dev;
        for (d = -2; d <= 3; d++) { k = Math.round(kC) + d; if (k >= 1) ks[k] = true; }
        for (k in ks) {
            k = parseInt(k, 10); w = p * k; h = q * k;
            dev = Math.max(Math.abs(w - wU) / wU, Math.abs(h - hU) / hU) * 100;
            list.push({ w: w, h: h, p: p, q: q, dev: dev });
        }
        list.sort(function (a, b) { return a.dev - b.dev; });
        return list.slice(0, 4);
    }

    // ---------- 유효성 검사 ----------
    if (app.documents.length === 0) { alert("문서를 먼저 열어주세요."); return; }
    var doc = app.activeDocument;
    if (doc.selection.length === 0) { alert("오브젝트를 하나 선택해주세요."); return; }
    if (doc.selection.length > 1) { alert("MVP는 단일 오브젝트만 지원합니다. 하나만 선택해주세요."); return; }

    var item = doc.selection[0];

    function currentSizePt() {
        var gb = item.geometricBounds; // [left, top, right, bottom] (stroke 무시)
        return { w: gb[2] - gb[0], h: gb[1] - gb[3] };
    }

    // ---------- UI ----------
    var units = ["mm", "pt", "px", "in"];
    var dlg = new Window("dialog", "SnapRatio — 비율 유지 정수 스냅");
    dlg.alignChildren = "fill"; dlg.margins = 16; dlg.spacing = 10;

    var uRow = dlg.add("group"); uRow.add("statictext", undefined, "단위:");
    var uDrop = uRow.add("dropdownlist", undefined, units); uDrop.selection = 0;

    var info = dlg.add("statictext", undefined, "", { multiline: true }); info.preferredSize.height = 34;

    dlg.add("statictext", undefined, "비율 유지 · 정수 사이즈 추천 (편차 순):");
    var listPanel = dlg.add("panel"); listPanel.alignChildren = "left"; listPanel.margins = 12; listPanel.spacing = 4;
    var radios = [];

    var btns = dlg.add("group"); btns.alignment = "right";
    var cancel = btns.add("button", undefined, "취소", { name: "cancel" });
    var apply = btns.add("button", undefined, "적용", { name: "ok" });

    var currentOptions = [];

    function refresh() {
        var u = units[uDrop.selection.index], f = PT[u];
        var sz = currentSizePt(), wU = sz.w / f, hU = sz.h / f;
        info.text = "현재: " + wU.toFixed(2) + " × " + hU.toFixed(2) + " " + u +
                    "   (비율 " + (wU / hU).toFixed(3) + ", 좌상단 고정)";
        // 라디오 재생성
        for (var i = radios.length - 1; i >= 0; i--) { listPanel.remove(radios[i]); }
        radios = [];
        currentOptions = buildOptions(wU, hU);
        for (var j = 0; j < currentOptions.length; j++) {
            var o = currentOptions[j];
            var label = o.w + " × " + o.h + " " + u + "   ·  " + o.p + ":" + o.q +
                        "  ·  편차 " + (o.dev < 0.05 ? "0%" : o.dev.toFixed(1) + "%") +
                        (j === 0 ? "   ◀ 추천" : "");
            var rb = listPanel.add("radiobutton", undefined, label);
            rb.value = (j === 0);
            radios.push(rb);
        }
        dlg.layout.layout(true);
    }

    uDrop.onChange = refresh;
    refresh();

    apply.onClick = function () {
        var idx = 0;
        for (var i = 0; i < radios.length; i++) { if (radios[i].value) { idx = i; break; } }
        var u = units[uDrop.selection.index], f = PT[u], o = currentOptions[idx];
        var newWpt = o.w * f, newHpt = o.h * f;
        var cur = currentSizePt();
        var sx = newWpt / cur.w * 100, sy = newHpt / cur.h * 100;
        // 좌상단 고정 스케일
        item.resize(sx, sy, true, true, true, true, true, Transformation.TOPLEFT);
        dlg.close();
        app.redraw();
    };

    dlg.show();
})();
