// ======================================================
// 洋務運動互動遊戲 - 遊戲資料
// ======================================================

const GAME_DATA = {

  // ===== 第一章：時代困局 =====
  chapter1: {
    title: "第一章　時代困局",
    subtitle: "1839 — 1860",
    intro: "你是耆英府上的年輕書記，因通曉英文，被延入幕中。\n鴉片戰爭的硝煙未散，天朝上國的幻夢在洋人炮聲中逐漸破碎。\n你將跟隨耆英、奕訢，親歷英法聯軍入京、太平天國席捲半壁江山。\n蒐集卷宗，記下議論——中國，該往何處去？",
    scenes: ["s1_1", "s1_2", "s1_3"],
    quiz: {
      title: "第一章　章末問答",
      question: "試分析洋務運動產生的背景。",
      keyPoints: [
        "外患：鴉片戰爭（1839-42）、英法聯軍之役（1856-60）——中國接連戰敗，喪失主權，簽訂不平等條約（南京、北京條約）；京師失陷，咸豐帝出走熱河。",
        "內憂：太平天國（1851-64）興起，建都南京，清廷需倚靠「常勝軍」及洋槍才能平亂，曾國藩、李鴻章等親歷洋器之利。",
        "新思潮：魏源《海國圖志》倡「師夷長技以制夷」；馮桂芬《校邠盧抗議》主「以中國倫常名教為原本，輔以諸國富強之術」，成洋務綱領。",
        "開明官員倡導：恭親王奕訢、文祥在中央；曾國藩、左宗棠、李鴻章、張之洞在地方，共同推動自強運動。"
      ]
    },
    note: {
      title: "第一章筆記：1839-1860 危機之始",
      summary: "鴉片戰爭與英法聯軍接連戰敗，太平天國席捲半壁——三千年「天朝上國」的自信，在這二十年裡徹底崩解，洋務運動因此醞釀而生。",
      coreFacts: [
        { year: "1839-42", who: "林則徐／道光帝", what: "鴉片戰爭", why: "中國首次敗於西方；《南京條約》割香港、五口通商、喪關稅司法主權，傳統武備之不足暴露無遺。" },
        { year: "1856-60", who: "咸豐帝／奕訢", what: "英法聯軍之役",  why: "圓明園被焚，《北京條約》再賠款、再開埠；直接刺激開明派朝廷高層思考圖強。" },
        { year: "1851-64", who: "洪秀全／曾國藩", what: "太平天國", why: "清廷依靠「常勝軍」洋槍炮平亂；曾、李親見洋器之利，奠定洋務人脈。" },
        { year: "1842 / 1861", who: "魏源／馮桂芬", what: "新思潮提出", why: "魏源《海國圖志》(1842) 提出「師夷長技以制夷」；馮桂芬《校邠盧抗議》(1861) 提「中體西用」雛形——洋務思想綱領形成。" }
      ],
      writingGems: [
        "兩次鴉片戰爭的戰敗，使清廷意識到傳統武備已不足以應付西方堅船利炮，是洋務運動最直接的催化劑。",
        "太平天國迫使清廷倚賴地方督撫平亂，曾國藩、李鴻章等漢族大員親歷洋槍洋炮之利，成為日後洋務運動的核心推手。",
        "魏源「師夷之長技以制夷」與馮桂芬「中體西用」奠定洋務的思想基礎，主張以西方科技補中國制度之不足。"
      ]
    }
  },

  // ===== 第二章：強兵之路 =====
  chapter2: {
    title: "第二章　強兵之路",
    subtitle: "1861 — 1872",
    intro: "你已轉入曾國藩、李鴻章幕下，繼續為洋務派書記。\n「自強以練兵為要，練兵又以製器為先。」\n總理衙門成立，江南機器製造總局的機器轟鳴。\n你親歷新式武器、新式軍隊、新式學堂——\n清廷學習西方的第一步，由你的筆下記入卷宗。",
    scenes: ["s2_1", "s2_2", "s2_3", "s2_4"],
    quiz: {
      title: "第二章　章末問答",
      question: "試描述洋務運動前期「強兵」的具體措施。",
      keyPoints: [
        "軍事工業：曾國藩建安慶軍械所（1861）；曾、李建江南機器製造總局（1865）；李鴻章建金陵機器製造局（1866）、天津機器製造局（1867）；左宗棠、沈葆楨建福州船政局（1866）。",
        "練兵：奕訢組洋槍隊；李鴻章聘外國軍官華爾、戈登訓練；以新式槍炮裝備湘軍、淮軍，逐漸取代腐敗的八旗綠營。",
        "政治外交：1861年設總理各國事務衙門，專責外交；1867年派蒲安臣使團出訪英、美、法、德等國，放下「天朝上國」思想。",
        "教育：京師同文館（1862）、上海廣方言館（1863）培養翻譯；福州船政學堂（1866）培養造船、駕駛人才；1872年容閎策劃首批一百二十名留美學童。"
      ]
    },
    note: {
      title: "第二章筆記：1861-1872 強兵之路",
      summary: "洋務以「自強」為號，推行軍事工業、新式練兵、外交體制與西式教育——「中體西用」框架下的第一次大規模制度引進。",
      coreFacts: [
        { year: "1861", who: "奕訢／文祥", what: "總理各國事務衙門", why: "中國首次設立專責外交機關，放下「天朝上國」思想，邁向近代外交體制。" },
        { year: "1865", who: "曾國藩／李鴻章", what: "江南機器製造總局", why: "當時東亞最大兵工廠，能造槍砲船艦，是強兵措施的核心，並附譯書館引進西方科技書籍。" },
        { year: "1866", who: "左宗棠／沈葆楨", what: "福州船政局與船政學堂", why: "仿造蒸汽戰艦並培養海軍人才，為日後北洋水師奠基；亦是中國最早的工程教育機構。" },
        { year: "1872", who: "容閎／曾國藩", what: "首批留美學童", why: "中國首次有計劃派員赴西方學習科技工程，是育才措施的關鍵起步。" }
      ],
      writingGems: [
        "洋務前期以「自強」為主軸，先後設立江南製造、福州船政等兵工廠，並聘外籍軍官訓練湘淮軍，建立中國第一代新式陸軍。",
        "總理衙門的設立標誌清廷正式承認「夷務」需以平等外交對待，是近代化政治體制的萌芽。",
        "藉容閎策劃之留美學童，配合同文館、廣方言館，洋務運動奠定近代專業人才培訓基礎。"
      ]
    }
  },

  // ===== 過場：1874 日本侵台 =====
  transition: {
    year: "1874",
    title: "日本侵台",
    subtitle: "強兵不足 · 必須同時求富",
    text: "日本派兵入侵台灣，清廷震驚。\n海防空虛暴露無遺，北洋水師尚未成形。\n\n李鴻章面對地圖，神色凝重：\n「船炮機器之用，非鐵不成，非煤不濟。」\n「鴉片戰爭以來，條約喪權，關稅喪失，洋貨充斥，國家經濟殘破……」\n「若不同時求富，強兵亦是無本之木。」\n\n自此，洋務運動目標由「強兵」正式轉向「富國」。"
  },

  // ===== 第三章：求富轉向 =====
  chapter3: {
    title: "第三章　求富轉向",
    subtitle: "1873 — 1893",
    intro: "日本侵台的警鐘，敲醒了洋務派。你已步入中年，仍隨李鴻章奔走。\n僅靠強兵不夠，必須同時求富，才能真正自強。\n你親見輪船招商局、電報、鐵路、煤礦、鐵廠、織廠——\n中國第一代民用工業，由你的卷宗記下其誕生。",
    scenes: ["s3_1", "s3_2", "s3_3", "s3_4"],
    quiz: {
      title: "第三章　章末問答",
      question: "（一）試說明洋務運動目標由「強兵」轉向「富國」的原因。\n（二）試描述後期「富國」的具體措施。",
      keyPoints: [
        "【目標轉變原因】1874年日本侵台，清廷認識海防不足，需強化軍備；條約喪失關稅自主，洋貨大量流入，嚴重打擊本土工商業，危害國家經濟，故須「挽回利權」。",
        "【交通】李鴻章以官督商辦形式設輪船招商局（1873），打破洋商壟斷航運；修築唐胥鐵路（1881），是中國自建第一條鐵路。",
        "【郵電】李鴻章、盛宣懷設南北洋電報總局、天津電報總局（1880），鋪設上海至香港海底電線、天津至上海電線。",
        "【礦務採煉】李鴻章設開平礦務局（1881）；張之洞設大冶鐵礦（1891）、漢陽鐵廠（1894），集冶鐵、煉銅、採煤為一體。",
        "【民用企業】左宗棠設蘭州機器織呢局（1880）；張之洞設武昌織布局（1892）；上海機器織布局（1890）。",
        "【教育】天津水師學堂（1880）、天津武備學堂（1885），培養軍事人才。"
      ]
    },
    note: {
      title: "第三章筆記：1873-1893 求富轉向",
      summary: "1874 日本侵台敲響警鐘，洋務由「強兵」擴展至「求富」——以官督商辦推行招商局、電報、鐵路、煤礦、鐵廠，開啟中國近代工商業之路。",
      coreFacts: [
        { year: "1873", who: "李鴻章／唐廷樞", what: "輪船招商局", why: "中國第一家官督商辦企業，五年盈利逾百萬兩；打破洋商航運壟斷，是「目標轉變」的標誌。" },
        { year: "1881", who: "盛宣懷／李鴻章", what: "天津電報局與唐胥鐵路", why: "建立中國自主電訊網絡與第一條自建鐵路；軍情傳遞由月縮為分，運煤效率倍增。" },
        { year: "1885", who: "李鴻章", what: "天津武備學堂", why: "仿普魯士陸軍規範訓練新式軍官，配合北洋艦隊與克虜伯重炮，是制度西化的高峰。" },
        { year: "1890-94", who: "張之洞", what: "漢陽鐵廠／大冶鐵礦", why: "1890 動工、1894 投產的中國最大鋼鐵聯合企業，配合開平煤礦形成煤鐵工業鏈，初步擺脫對洋鐵的依賴。" }
      ],
      writingGems: [
        "1874 年日本侵台暴露海防不足，加上不平等條約令洋貨充斥、利權外流，洋務派遂從「強兵」擴展至「以商業反哺國防」的「求富」階段。",
        "「官督商辦」是洋務後期最具創意的制度設計，既保官方主導又引入商業誘因，是中國近代化的早期嘗試。",
        "後期措施奠定中國第一代近代工商業基礎——招商局、電報、鐵路、煤鐵聯合，皆為日後民族工業之先聲。"
      ]
    }
  },

  // ===== 第四章：帝國之殤 =====
  chapter4: {
    title: "第四章　帝國之殤",
    subtitle: "1894",
    intro: "三十年了。你已不再年輕，仍守在李鴻章身旁。\n倭仁的反對、慈禧的挪用、各省的各自為政——\n所有積累的問題，在 1894 年的黃海之上，一次過爆發。\n你蒐集的卷宗，將為這個時代留下最後的證詞。",
    scenes: ["s4_1", "s4_2", "s4_3"],
    quiz: {
      title: "第四章　章末問答",
      question: "試分析洋務運動失敗的原因。",
      keyPoints: [
        "【自身問題 · 識見有限】洋務派堅持「中學為體，西學為用」，只學洋人船堅炮利，忽略政治制度改革。李鴻章：「中國文武制度，事事遠出西人之上，獨火器萬不能及。」梁啟超評李：「知有兵事而不知有民政，知有洋務而不知有國務。」",
        "【自身問題 · 權力有限、官員不和】缺乏中央統籌，慈禧猜忌奕訢。李鴻章主張加強海防、左宗棠主張海防塞防並重，意見不合；後期李與張之洞交惡。甲午戰爭期間，南洋水師不支援北洋。",
        "【自身問題 · 用人不當】官督商辦企業無需自負盈虧，官員中飽私囊、貪污舞弊，安插親友，效率低下。",
        "【外來阻力 · 保守派反對】倭仁：「立國之道，尚禮義，不尚權謀；根本之圖，在人心，不在技藝。」徐桐：「寧可亡國，不可變法。」守舊派視西方科技為「奇技淫巧」。",
        "【外來阻力 · 經費不足】兩次鴉片戰爭賠款甚鉅；慈禧挪用三千萬北洋軍費興建頤和園，其中八成被李蓮英侵吞；洋務經費多由地方自籌，力有不逮。",
        "【外來阻力 · 民智未開】社會風氣保守，士紳群眾排斥西洋事物，認為修鐵路、鋪電線、開礦會破壞風水，阻礙建設。"
      ]
    },
    note: {
      title: "第四章筆記：1867-1895 帝國之殤",
      summary: "同文館論爭、頤和園挪款、黃海海戰、馬關條約——三十年洋務的所有積弊，在 1894-95 年集中爆發；敗於思想阻力、體制內耗、用人不當與民智未開。",
      coreFacts: [
        { year: "1867", who: "倭仁／奕訢", what: "同文館論爭", why: "守舊派以「中體」之名抗拒西學增設算學科；雖未阻成立，但反映改革深度受意識形態鉗制。" },
        { year: "1885-94", who: "慈禧／李蓮英", what: "挪用海軍軍費修頤和園", why: "三千萬北洋軍費被截，艦隊十年未更新；制度性腐敗令洋務功虧一簣。" },
        { year: "1894-09-17", who: "丁汝昌／鄧世昌", what: "黃海海戰", why: "北洋水師獨木難支，南洋以「非我所轄」拒援；制度性問題在戰場上引爆。" },
        { year: "1895", who: "李鴻章", what: "馬關條約", why: "割台灣、澎湖，賠款二億兩，洋務破產；但其遺產（留學生、工廠、海軍經驗）為日後維新與革命埋下火種。" }
      ],
      writingGems: [
        "洋務失敗的根本原因，在於「中體西用」的思想框架——只學西方器物而拒絕政治制度改革，使努力無法觸及體制深處。",
        "慈禧挪用軍費、各省水師各自為政、官督商辦企業中飽私囊——洋務的失敗，更多是體制積弊而非個別決策之錯。",
        "縱然失敗，洋務運動奠定了中國近代化的物質與人才基礎，是維新運動與辛亥革命的重要前奏。"
      ],
      masterSheet: {
        failureCauses: [
          { area: "思想",   text: "「中體西用」拒絕制度變革，限制改革深度——只學器物，不動體制，是失敗的根源。" },
          { area: "制度",   text: "缺乏中央統籌，地方督撫各自為政；李鴻章與左宗棠、張之洞意見不合，南北洋互不馳援。" },
          { area: "人才",   text: "官督商辦企業官員中飽私囊、安插親友；缺乏現代企業治理經驗，效率低下。" },
          { area: "資金",   text: "兩次戰爭賠款龐大，慈禧挪用海軍軍費修頤和園；地方自籌能力有限，工業擴張受制。" }
        ],
        evaluation: {
          achievements: [
            "奠定中國近代工商業基礎：招商局、電報、鐵路、煤鐵廠等開創民族工業先聲。",
            "培養首批新式人才：留美學童、同文館、福州船政、武備學堂為日後維新革命供應骨幹。",
            "建立近代軍事與外交體制：北洋艦隊、總理衙門開啟中國近代化政治與國防的雛形。"
          ],
          failures: [
            "限於器物層面，未觸動政治制度——「中體西用」綱領本身限制了改革深度。",
            "未能阻止甲午戰敗：黃海一役，三十年積累化為灰燼，賠款喪地。",
            "強化地方督撫勢力，為日後軍閥割據之禍埋下伏筆。"
          ]
        },
        compareJapan: [
          { aspect: "領導層",   china: "地方督撫主導，朝廷掣肘",    japan: "天皇與少數武士集體推動，威權集中" },
          { aspect: "制度改革", china: "保留科舉、藩屬、儒家倫理",  japan: "廢藩置縣、廢武士、文明開化" },
          { aspect: "改革深度", china: "「中體西用」器物層面",        japan: "制度與文化全面西化" },
          { aspect: "財政體系", china: "缺乏統一財政，地方自籌",    japan: "地租改正、現代財政體系" },
          { aspect: "教育體制", china: "科舉並行、新式學堂為輔",    japan: "頒《學制》，全民義務教育" },
          { aspect: "結果",     china: "甲午戰敗，三十年付諸流水",  japan: "躋身列強，殖民朝鮮、台灣" }
        ]
      }
    }
  },

  // ===== 結局 =====
  endings: {
    historical: {
      title: "歷史的審判",
      text: "1895 年春。馬關。李鴻章在春帆樓的桌前坐下，臉上還貼著日本浪人槍擊留下的紗布。\n\n條約攤開了——\n一、割讓台灣、澎湖、遼東半島；\n二、賠款白銀二億兩；\n三、增開沙市、重慶、蘇州、杭州為通商口岸；\n四、允許列強在通商口岸設立工廠。\n\n三十年洋務，最終以這一紙條約作結。第四款，更標誌中國淪為列強資本輸出對象——洋務「自強」徹底破產。\n\n北洋艦隊的殘骸還沉在黃海。鄧世昌率致遠艦撞向吉野壯烈犧牲，林永升戰死經遠，丁汝昌威海拒降自盡——一個個名字，已成為歷史的註腳。\n\n「中學為體，西學為用」的嘗試，終究敵不過根深柢固的體制積弊。洋務運動，以失敗告終。\n\n但火種未滅。留學生、工廠、鐵路、電報、海軍——這些播下的種子，將在日後的維新、辛亥、五四之中，逐一燃起。\n\n失敗的不是這群人。失敗的是一個無法容納他們的時代。",
      voiceLi: "「老夫這一生，做的事，不可謂不多。江南製造、招商輪船、北洋海軍——一磚一瓦，都是老夫從這個朝廷一寸寸爭來的。可那又如何呢？銀子永遠不夠，朝中永遠有人罵，太后那邊永遠捉不準心思。三十年走下來，老夫只想說一句：在這個時代，能做到這個地步，已經是窮盡了一個人的全部。歷史要審判，就審判罷。」",
      voiceLiang: "「李文忠公（李鴻章）非無才之人，亦非無志之人。其敗也，敗於『有兵事而無民政，有外交而無內治』。所謂洋務，治標而不治本，欲以技藝補救積弊，譬如重病之人吃補藥而不肯動手術——藥越補，病越深。中國欲真強，必自變法始；變法之道，非自皇權立憲、開議院、興民權，無以致之。」",
      voiceSelfQuestion: "若洋務運動真的失敗了——那它失敗的，究竟是技術，還是制度？是個人，還是時代？"
    }
  },

  // ======================================================
  // 場景詳細資料
  // ======================================================
  scenes: {

    // ========== 第一章 ==========
    s1_1: {
      chapter: 1,
      title: "1842年　虎門炮台",
      year: "1842",
      bg: "bg-cannon",
      description: "鐵甲輪船在珠江巡弋，炮台已毀。繃帶滲血的清兵身旁，散落著舊式火銃彈。",
      tutorialHint: "場景中有可細看的物件；找不到時，可按右下角「?」提示。",
      sceneHint: "廢墟之中，傷兵的沉默與洋艦的轟鳴並列——這就是帝國潰敗的真相。",
      objects: [
        { id: "o1_1_1", label: "受傷清兵", isCharacter: true,
          x: 32, y: 49, w: 12, h: 18,
          evidence: "e_wounded_soldier", isPuzzleTarget: true,
          closeup: "images/closeup/o1_1/o1_1_1.jpg" },
        { id: "o1_1_2", label: "英軍士官", isCharacter: true,
          x: 73, y: 28, w: 11, h: 18,
          evidence: "e_british_officer_1842",
          closeup: "images/closeup/o1_1/o1_1_2.jpg" },
        { id: "o1_1_3", label: "清代舊式鑄鐵炮殘件",
          x: 52, y: 65, w: 16, h: 10,
          evidence: "e_iron_cannon_ruins", isPuzzleTarget: true,
          closeup: "images/closeup/o1_1/o1_1_3.jpg" },
        { id: "o1_1_4", label: "英軍燧發槍殘件",
          x: 87, y: 77, w: 13, h: 9,
          evidence: "e_british_musket_1842",
          closeup: "images/closeup/o1_1/o1_1_4.jpg" },
        { id: "o1_1_5", label: "《南京條約》草稿",
          x: 13, y: 47, w: 13, h: 10,
          evidence: "e_nanjing_treaty_draft", isPuzzleTarget: true,
          closeup: "images/closeup/o1_1/o1_1_5.jpg" }
      ],
      puzzle: {
        title: "找出清軍戰敗的三個層面",
        targets: ["o1_1_1", "o1_1_3", "o1_1_5"],
        requiredCount: 3,
        successMessage: "傷兵、殘炮、條約——人的代價、武器的差距、主權的喪失：三個層面合而為一，道盡1842年的潰敗。"
      },
      dialogue: {
        speaker: "兩廣總督耆英",
        text: "英人此番⊙非只圖我疆土，乃圖通商之利。⊙\n以禮儀感化、互市安撫——方為長治久安之道。⊙\n然此話，如今說來……**連我自己也難以置信了。**"
      },
      decision: {
        prompt: "面對鴉片戰爭的敗局，中國的出路是？",
        choiceA: "購置洋槍洋炮，以彼之器制彼——武器追上去，問題便解決。",
        choiceB: "正視差距，從武器到訓練到制度，全面了解西方為何強大。",
        outcomeA: "購置火器的奏摺迅速批准。守舊派對「只買器物」沒有異議——但那把打開西方大門的鑰匙，你選擇留在門外。",
        outcomeB: "奕訢在奏摺旁加了一段批注。朝廷遲疑三個月才批，但你的問題，已比同僚更深一層。"
      },
      rebuttal: {
        speaker: "兩廣總督耆英",
        text: "**天朝上國威儀，豈能效法蠻夷？**⊙\n以禮儀懷柔，方為上策。⊙\n洋人所求不過通商——給之即可，何需言甚麼「自強」？"
      },
      persuasion: [
        { evidence: "e_wounded_soldier", strength: "strong", points: 2, response: "（耆英的目光久久停在那名傷兵身上——他第一次發現，自己的「外交安撫」四個字裡沒有血肉的重量。）" },
        { evidence: "e_nanjing_treaty_draft", strength: "strong", points: 2, response: "耆英用拇指撫過條約上的朱印，撫了三遍。沒有開口。" },
        { evidence: "e_iron_cannon_ruins", strength: "medium", points: 1, response: "「炮台既毀⊙確需整頓——」耆英說到一半，聲音低了下去，「**師夷**……此事，仍需審慎。」" },
        { evidence: "e_british_musket_1842", strength: "medium", points: 1, response: "（耆英伸手摸了摸槍管，指節微縮——那是一種他從未感受過的金屬冷度。）" },
        { evidence: "e_british_officer_1842", strength: "weak", points: 0,
          rebuttalSpeaker: "兩廣總督耆英",
          rebuttal: "**洋人自誇之辭！**敵言豈能作據！",
          response: "（你意識到——史料的「來源」本身就是說服力的一部分。引敵言只會強化對方戒心。）" }
      ],
      combos: [
        { requires: ["e_wounded_soldier", "e_nanjing_treaty_draft"],
          label: "血肉與條約：戰敗的雙重代價",
          points: 5,
          response: "耆英沉默良久，終於低聲道：「血染戰場，墨蓋條約——士卒倒下的同時，主權也跌落了。兩者並列，竟無從辯駁。」（你將傷兵與條約並陳，揭示戰敗不只是軍事的失利，更是國格的淪喪。耆英無法再以外交辭令迴避。）" }
      ]
    },

    s1_2: {
      chapter: 1,
      title: "1860年　八里橋戰場",
      year: "1860",
      bg: "bg-battlefield",
      description: "1860 年 9 月，八里橋。僧格林沁的三萬蒙古鐵騎，弓刀對線膛炮。半日之內，全軍覆沒——硝煙裡，北京城門朦朧若現。",
      sceneHint: "弓刀對線膛炮，騎射對速射——一座橋的距離，就是兩個時代的距離。",
      objects: [
        { id: "o1_2_1", label: "倒地的蒙古騎兵", isCharacter: true,
          x: 30, y: 73, w: 14, h: 18,
          evidence: "e_mongolian_cavalry", isPuzzleTarget: true,
          closeup: "images/closeup/o1_2/o1_2_1.jpg" },
        { id: "o1_2_3", label: "蒙古騎兵彎刀",
          x: 15, y: 87, w: 14, h: 9,
          evidence: "e_cavalry_saber",
          closeup: "images/closeup/o1_2/o1_2_3.jpg" },
        { id: "o1_2_4", label: "阿姆斯特朗炮炮彈殼",
          x: 80, y: 47, w: 12, h: 10,
          evidence: "e_armstrong_shell", isPuzzleTarget: true,
          closeup: "images/closeup/o1_2/o1_2_4.jpg" },
        { id: "o1_2_5", label: "《北京條約》停戰通牒",
          x: 61, y: 55, w: 13, h: 10,
          evidence: "e_beijing_treaty_1860",
          closeup: "images/closeup/o1_2/o1_2_5.jpg" },
        // 希望微光：文祥隨軍筆記殘頁（1860 八里橋當場，1861 即與奕訢創立總理衙門）
        { id: "o1_2_6", label: "文祥隨軍筆記殘頁",
          x: 82, y: 63, w: 11, h: 9,
          evidence: "e_wenxiang_notes",
          closeup: "images/closeup/o1_2/o1_2_6.jpg" },
        // 分支獎勵：s1_1 選 B 才出現（油畫前景右側草叢隱藏）
        { id: "o1_2_extra", label: "魏源遺稿殘頁",
          x: 50, y: 82, w: 10, h: 8,
          evidence: "e_wei_yuan_note",
          closeup: "images/closeup/o1_2/o1_2_extra.jpg",
          requires: { "s1_1": "B" } }
      ],
      puzzle: {
        title: "冷兵器對現代火炮——差距有多大？",
        targets: ["o1_2_1", "o1_2_4"],
        requiredCount: 2,
        successMessage: "倒地騎兵與炮彈殼並列：蒙古彎刀衝鋒，阿姆斯特朗炮在一英里外已完成三輪射擊。這不是戰術失誤，是武器時代的代差。"
      },
      dialogue: {
        speaker: "恭親王奕訢",
        text: "京師陷落，皇上北狩，圓明園付之一炬——⊙\n此等奇恥大辱，奕訢一日未忘。⊙\n然今日仇恨，不能以昨日之法雪恨。⊙\n**師夷長技，非賣國，乃救國。**"
      },
      decision: {
        prompt: "眼見京師淪陷，如何自強？",
        choiceA: "集中購置西式火炮，以洋槍洋炮裝備現有軍隊，先解燃眉之急。",
        choiceB: "不只購器，更需學習西方的訓練制度與外交體系，全面改革。",
        outcomeA: "槍炮撥款迅速下達，守舊派沉默——畢竟是「器物」，不涉道統。但下一仗，武器夠用，制度仍在原地。",
        outcomeB: "奕訢駐足思考。「不只購器」——這四個字，日後將成為洋務派的分水嶺。"
      },
      rebuttal: {
        speaker: "守舊大臣",
        text: "**祖宗之法不可變！**⊙\n中國數千年禮樂制度，豈能輕易動搖？⊙\n洋人雖勝，乃天時地利，非制度之功——此乃亡國之論！"
      },
      persuasion: [
        { evidence: "e_mongolian_cavalry", strength: "strong", points: 2, response: "（守舊大臣的眼神在屍堆與炮位之間來回——他第一次承認，**勇氣不夠用了**。）" },
        { evidence: "e_armstrong_shell", strength: "strong", points: 2, response: "守舊大臣盯著彈殼許久。沒有說話。最後只低低問了一句：「⊙此炮，三千碼？」" },
        { evidence: "e_cavalry_saber", strength: "medium", points: 1, response: "「彎刀如此——」他話到一半，撫過刀背的灰塵，「**時代已變了**。」" },
        { evidence: "e_wenxiang_notes", strength: "medium", points: 1, response: "（守舊大臣讀著文祥的筆記——同朝重臣親筆，已不能用「敵言」二字打發。他沉默了許久。）" },
        { evidence: "e_beijing_treaty_1860", strength: "weak", points: 0,
          rebuttalSpeaker: "守舊大臣",
          rebuttal: "**條約不過紙文！**——國力一日恢復，可一日撕毀，何懼之有？",
          response: "（你聽出守舊派把屈辱當作「可逆」——這種否認機制比敵言不足信更頑固，需以**體制性後果**而非單一文書才能撼動。）" }
      ]
    },

    s1_3: {
      chapter: 1,
      title: "1860年　朝廷議事廳",
      year: "1860",
      bg: "bg-court",
      description: "圓明園的煙未散，兩本書在長桌上對望。三千年天朝的自信，第一次出現裂縫。",
      sceneHint: "兩本書在桌上對望——一條是「師夷長技」之路，一條是「制度變革」之路；中間隔著的，是整個帝國的猶豫。",
      objects: [
        { id: "o1_3_1", label: "翰林院學士", isCharacter: true,
          x: 78, y: 36, w: 12, h: 20,
          evidence: "e_hanlin_scholar",
          closeup: "images/closeup/o1_3/o1_3_1.jpg" },
        { id: "o1_3_2", label: "《海國圖志》",
          x: 13, y: 65, w: 13, h: 10,
          evidence: "e_haiguo_tuzhi", isPuzzleTarget: true,
          closeup: "images/closeup/o1_3/o1_3_2.jpg" },
        { id: "o1_3_3", label: "《校邠盧抗議》",
          x: 73, y: 75, w: 13, h: 10,
          evidence: "e_jiao_bin_lu",
          closeup: "images/closeup/o1_3/o1_3_3.jpg" },
        { id: "o1_3_4", label: "太平天國奏報",
          x: 45, y: 53, w: 13, h: 10,
          evidence: "e_taiping_report",
          closeup: "images/closeup/o1_3/o1_3_4.jpg" },
        { id: "o1_3_5", label: "常勝軍戰報",
          x: 75, y: 55, w: 13, h: 10,
          evidence: "e_ever_victorious_report", isPuzzleTarget: true,
          closeup: "images/closeup/o1_3/o1_3_5.jpg" }
      ],
      puzzle: {
        title: "拼湊洋務運動的催化事件",
        description: "找出四件催生洋務運動的關鍵事件，理解時代的緊迫感。",
        successMessage: "南京條約、太平天國、英法聯軍、總理衙門——四件事疊加，方有洋務運動的啟動。",
        targets: ["o1_3_2", "o1_3_3", "o1_3_4", "o1_3_5"],
        requiredCount: 4,
      },
      dialogue: {
        speaker: "恭親王奕訢",
        text: "本王少時，亦讀聖賢之書，以為仁義可安天下、禮樂能服四夷。⊙\n然而夷炮一響，城牆塌了，書也燒了。⊙\n**這把火，燒的不只是圓明園——燒的是我們幾百年的自大。**⊙\n魏源《海國圖志》早成於十餘年前，朝中竟少有人讀過。如今英法既退兵，賠款議定——⊙\n**師夷長技，不是屈辱，是清醒。**⊙\n倭仁諸老以為學習洋器是喪失人心。本王以為——連人心都守不住的炮台，才是真正的喪失。"
      },
      decision: {
        prompt: "面對時局，如何為洋務運動定綱領？",
        choiceA: "師夷長技以制夷——學習西方軍事技術已足夠，倫常名教不可觸動。",
        choiceB: "以中國倫常為本，同時系統學習西方富強之術，不限於武器。",
        outcomeA: "「師夷長技」的邊界就此劃定：器物可學，倫常不動。這條線，守住了朝廷的支持，也守住了改革的天花板。",
        outcomeB: "「中體西用」的輪廓在你的選擇中浮現——它是洋務運動的靈魂，也是它最終無法突破的枷鎖。"
      },
      rebuttal: {
        speaker: "倭仁",
        text: "**立國之道，尚禮義，不尚權謀！**⊙\n**根本之圖，在人心，不在技藝！**⊙\n西方科技乃奇技淫巧——人心盡失，縱有洋炮千門，亦守不住中國！"
      },
      persuasion: [
        { evidence: "e_haiguo_tuzhi", strength: "strong", points: 2, response: "倭仁翻開《海國圖志》⊙翻到第三頁停下：「**師夷之長技以制夷**——以制夷為目的，倒尚可議。」" },
        { evidence: "e_ever_victorious_report", strength: "strong", points: 2, response: "（倭仁讀完戰報，把它推回桌面——他知道自己無法用「奇技淫巧」四字打發這些數字。）" },
        { evidence: "e_taiping_report", strength: "medium", points: 1, response: "「太平之亂⊙乃人心不古——」倭仁停下，「然洋槍確曾助平亂，此點⊙吾不否認。」" },
        { evidence: "e_jiao_bin_lu", strength: "medium", points: 1, response: "（倭仁點了點頭，幅度極小——「**中學為體**」四個字，他可以接受。其餘的，仍懸在半空。）" },
        { evidence: "e_hanlin_scholar", strength: "weak", points: 0,
          rebuttalSpeaker: "倭仁",
          rebuttal: "**翰林所言極是！**科舉乃國之根本，萬不可動搖！",
          response: "（你發現以同陣營者為論據，反而強化了對方立場——說服需要**超越**對方陣營，而非附和。）" },
        // 隱藏論據：s1_1 選 B → 在 s1_2 拾得魏源遺稿
        { evidence: "e_wei_yuan_note", strength: "strong", points: 3,
          requires: { "s1_1": "B" },
          response: "倭仁凝視手稿，沉默良久：「魏源……此人早於十八年前已寫下答案。我等執著於『以禮儀懷柔』，竟未讀過此書。或許，自強之說，並非後生新論，而是吾輩遲到的覺醒。」" }
      ],
      combos: [
        { requires: ["e_haiguo_tuzhi", "e_jiao_bin_lu"],
          label: "師夷之長技 × 中體西用",
          points: 5,
          response: "倭仁面色變了又變，終於緩緩起身：「魏源指出方向，馮桂芬定下分寸——一以制夷，一守中學。二者並陳，非要全盤西化，而是有所取捨。此論……或可一議。」（你將理論先聲與框架原則並陳，倭仁無法再以「動搖根本」反駁。洋務運動的綱領，在此確立。後世稱此思想為「中體西用」，由張之洞 1898 年《勸學篇》正式定型。）" }
      ]
    },

    // ========== 第二章 ==========
    s2_1: {
      chapter: 2,
      title: "1861年　總理衙門",
      year: "1861",
      bg: "bg-yamen",
      description: "總理衙門的匾額朱漆未乾。大清帝國第一次承認：天下不只一個中心。",
      sceneHint: "這個院子是大清第一次主動承認「天下不只一個中心」的地方——掛上的匾額，是兩百年來最沉重的一塊。",
      objects: [
        { id: "o2_1_1", label: "等候的西洋外交官", isCharacter: true, x: 70, y: 47, w: 12, h: 20, evidence: "e_western_diplomat_1861", closeup: "images/closeup/o2_1/o2_1_1.jpg" },
        { id: "o2_1_2", label: "西洋地球儀", x: 17, y: 45, w: 13, h: 12, evidence: "e_zongli_globe", isPuzzleTarget: true, closeup: "images/closeup/o2_1/o2_1_2.jpg" },
        { id: "o2_1_3", label: "紅木外交文件盒", x: 64, y: 66, w: 13, h: 10, evidence: "e_diplomatic_box", closeup: "images/closeup/o2_1/o2_1_3.jpg" },
        { id: "o2_1_4", label: "列強在華勢力地圖", x: 90, y: 22, w: 14, h: 12, evidence: "e_foreign_sphere_map", isPuzzleTarget: true, closeup: "images/closeup/o2_1/o2_1_4.jpg" },
        { id: "o2_1_5", label: "蒲安臣使團記錄", x: 27, y: 76, w: 13, h: 10, evidence: "e_burlingame_records", isPuzzleTarget: true, closeup: "images/closeup/o2_1/o2_1_5.jpg" }
      ],
      puzzle: {
        title: "為何必須主動外交",
        targets: ["o2_1_2", "o2_1_4", "o2_1_5"],
        requiredCount: 3,
        successMessage: "地球儀說明天下已非「天朝一統」；勢力地圖揭示列強已深入華土；蒲安臣使團記錄則證明主動外交確能換來喘息空間。三者合一，總理衙門的必要性不言而喻。"
      },
      dialogue: {
        speaker: "奕訢",
        text: "英法退兵之後，奉旨成立此衙門。⊙\n親友皆以為受辱之職，我卻以為是救國之機。⊙\n天下大勢，列強並立——**強者恃力，弱者需以智周旋。**⊙\n此衙門不只是外交折衝之所，更是**中國認識世界的窗口**。"
      },
      decision: {
        prompt: "總理衙門的角色應如何定位？",
        choiceA: "處理外交事務，維持與列強關係，避免衝突即可。",
        choiceB: "應派長駐使節，深入了解各國政治制度，不只外交斡旋。",
        outcomeA: "總理衙門成為收發文件的管道。與列強周旋，有技巧，有限度——但始終是被動應對。",
        outcomeB: "長駐使節的建議讓守舊派不安。「天朝何須在洋人京城設衙？」——但你知道，看不見的對手，才是最危險的。"
      },
      rebuttal: {
        speaker: "禮部侍郎",
        text: "**天朝上國，向以禮制御四夷，萬邦來朝。**⊙\n今設此衙門，已是破壞祖宗法度；⊙\n若再遣使洋地，豈非拱手承認列邦對等？萬萬不可！"
      },
      persuasion: [
        { evidence: "e_foreign_sphere_map", strength: "strong", points: 2, response: "（禮部侍郎的視線跟著地圖上的紅藍色塊移動——他第一次意識到，**「夷情」已不是邊疆問題，而是腹地問題**。）" },
        { evidence: "e_burlingame_records", strength: "strong", points: 2, response: "禮部侍郎讀著使團記錄。讀了很久。最後只說了三個字：「⊙確有用。」" },
        { evidence: "e_zongli_globe", strength: "medium", points: 1, response: "「天下萬國⊙如此繁多——」侍郎用手指輕推地球儀，球面緩緩轉了半圈，他沒再說話。" },
        { evidence: "e_diplomatic_box", strength: "medium", points: 1, response: "（禮部侍郎打開文件盒，看了一眼，便闔上——他知道，這些事，禮部已力有未逮。）" },
        { evidence: "e_western_diplomat_1861", strength: "weak", points: 0,
          rebuttalSpeaker: "禮部侍郎",
          rebuttal: "**洋人自誇其制！**豈能以敵言為據——有損天威！",
          response: "（「天威」是禮部最後的盾牌——必須以**中國自身損失**為據，而非敵人的話，方能撼動。）" }
      ]
    },

    s2_2: {
      chapter: 2,
      title: "1865年　江南機器製造總局",
      year: "1865",
      bg: "bg-factory",
      description: "蒸汽機轟鳴，傅蘭雅的藍圖，中國工匠手抄的漢字譯註——西洋技術在這裡，第一次轉化成中文。",
      sceneHint: "機器在轉，但真正的問題是：那把藍圖上的鑰匙，能否真正交到中國人手中。",
      objects: [
        { id: "o2_2_1", label: "傅蘭雅（John Fryer）", isCharacter: true, x: 21, y: 37, w: 12, h: 20, evidence: "e_john_fryer", closeup: "images/closeup/o2_2/o2_2_1.jpg" },
        { id: "o2_2_2", label: "中西對照技術藍圖", x: 83, y: 35, w: 13, h: 10, evidence: "e_bilingual_manual", isPuzzleTarget: true, closeup: "images/closeup/o2_2/o2_2_2.jpg" },
        { id: "o2_2_3", label: "蒸汽機核心齒輪", x: 43, y: 63, w: 14, h: 10, evidence: "e_steam_gear", isPuzzleTarget: true, closeup: "images/closeup/o2_2/o2_2_3.jpg" },
        { id: "o2_2_4", label: "半完成的炮管", x: 79, y: 57, w: 13, h: 10, evidence: "e_cannon_barrel", isPuzzleTarget: true, closeup: "images/closeup/o2_2/o2_2_4.jpg" },
        { id: "o2_2_5", label: "煤鐵原料", x: 29, y: 73, w: 13, h: 10, evidence: "e_coal_iron", closeup: "images/closeup/o2_2/o2_2_5.jpg" },
        // 分支獎勵：s2_1 選 B 才出現
        { id: "o2_2_extra", label: "總理衙門公文夾", x: 55, y: 22, w: 10, h: 8, evidence: "e_zongli_doc", closeup: "images/closeup/o2_2/o2_2_extra.jpg", requires: { "s2_1": "B" } }
      ],
      puzzle: {
        title: "兵工廠的三大核心",
        targets: ["o2_2_2", "o2_2_3", "o2_2_4"],
        requiredCount: 3,
        successMessage: "知識引進、機器動力、武器製造——三者缺一不可。藍圖教會工人原理，飛輪帶動機器運轉，炮管在刀鋒上淬鍊——江南機器製造總局的強大，靠的就是這三樣。"
      },
      dialogue: {
        speaker: "曾國藩",
        text: "製器之道，非僅購置洋機器而已。⊙\n江南局附設譯書局，命傅蘭雅等將西書譯為中文——使我中國工匠無需假手洋人。⊙\n此局製槍炮固然可喜，然**譯書局所傳之知識，方是百年自強之根本**。⊙\n李文忠（李鴻章）已奏設**金陵、天津機器局**，與江南局南北並進；**閩浙左公（左宗棠）於福州馬尾另立船政局**，造蒸汽戰艦兼辦船政學堂——海防自此有了根。"
      },
      decision: {
        prompt: "譯書局的規模應如何？",
        choiceA: "維持現有規模，以製造槍炮為首要，書籍翻譯量力而為。",
        choiceB: "大力擴充譯書局，系統翻譯西方科學，為長遠技術自主奠基。",
        outcomeA: "翻譯局勉強維持。槍炮足夠，知識慢慢來——但那些等待翻譯的化學、機械書籍，正在改變另一個國家的學生。",
        outcomeB: "傅蘭雅拿到更多人手，譯書速度加倍。十年後，這批書將成為中國第一代工程師的啟蒙讀本。"
      },
      rebuttal: {
        speaker: "財政官員",
        text: "譯書局費資甚鉅——翻譯書籍豈能代替槍炮？⊙\n眼下軍務緊急，何必浪費銀兩在書本上？⊙\n**多造幾門炮，比什麼都實際！**"
      },
      persuasion: [
        { evidence: "e_john_fryer", strength: "strong", points: 2, response: "（財政官員把譯書清單從頭讀到尾——百餘種。他終於明白，這筆錢買的不是書，是**獨立**。）" },
        { evidence: "e_bilingual_manual", strength: "strong", points: 2, response: "「中西對照⊙工人無須依賴洋人亦能照圖操作——」官員翻過一頁、又一頁，忽然停下：「⊙原來如此。」" },
        { evidence: "e_steam_gear", strength: "medium", points: 1, response: "（官員伸手轉了轉那組齒輪，齒紋咬合得嚴絲合縫——他第一次感受到，**這種精度不是仿造能達到的**。）" },
        { evidence: "e_cannon_barrel", strength: "medium", points: 1, response: "「炮管自製固然可喜⊙然若不懂原理——」官員擱下手，「洋人一旦離去⊙又當如何？」" },
        { evidence: "e_coal_iron", strength: "weak", points: 0,
          rebuttalSpeaker: "財政官員",
          rebuttal: "煤鐵之事⊙自是必要——但這與**譯書局**的花費，何干？",
          response: "（論據真實卻偏離焦點——說服必須直擊對方的具體質疑，而非另立議題。）" }
      ]
    },

    s2_3: {
      chapter: 2,
      title: "1870年　天津練兵場",
      year: "1870",
      bg: "bg-barracks",
      description: "英文口令、清軍士兵。靶上的彈孔稀稀落落——舊式士兵遇上新式槍。",
      sceneHint: "靶標上的彈孔密度，就是新式槍與舊式兵之間，那道難以填平的鴻溝。",
      objects: [
        { id: "o2_3_1", label: "外籍教官", isCharacter: true, x: 93, y: 28, w: 11, h: 18, evidence: "e_foreign_military_advisor", closeup: "images/closeup/o2_3/o2_3_1.jpg" },
        { id: "o2_3_2", label: "恩菲爾德步槍架", x: 62, y: 32, w: 13, h: 14, evidence: "e_enfield_rack", isPuzzleTarget: true, closeup: "images/closeup/o2_3/o2_3_2.jpg" },
        { id: "o2_3_3", label: "西式陣法操練圖", x: 39, y: 53, w: 14, h: 10, evidence: "e_formation_manual", isPuzzleTarget: true, closeup: "images/closeup/o2_3/o2_3_3.jpg" },
        { id: "o2_3_4", label: "戈登訓練日誌", x: 67, y: 60, w: 13, h: 10, evidence: "e_gordon_journal", closeup: "images/closeup/o2_3/o2_3_4.jpg" },
        { id: "o2_3_5", label: "木製射擊靶標", x: 14, y: 78, w: 13, h: 10, evidence: "e_target_board", isPuzzleTarget: true, closeup: "images/closeup/o2_3/o2_3_5.jpg" }
      ],
      puzzle: {
        title: "新式軍隊的三大要素",
        targets: ["o2_3_2", "o2_3_3", "o2_3_5"],
        requiredCount: 3,
        successMessage: "武器、陣法、成效——三者合一，正是淮軍超越舊式八旗的根本原因。步槍換裝、散兵線訓練、靶標上的彈孔，每一樣都是可量度的進步。"
      },
      dialogue: {
        speaker: "戈登",
        text: "三月之前，這些士兵還握著彎刀。⊙\n我從不懷疑他們的勇氣——**問題不在勇氣，而在系統**。⊙\n換上恩菲爾德、教會散兵線、再讓他們明白「為何站在這個位置」——**他們學得，比我預期快**。"
      },
      decision: {
        prompt: "練兵改制，下一步應如何？",
        choiceA: "以現有淮軍為基礎，逐步推廣西式訓練即可，毋須急於改變現行軍制。",
        choiceB: "應趁此時機建立全國統一新式軍制，以國家之名號令天下，徹底取代各省舊軍。",
        outcomeA: "淮軍訓練有所進步，但軍制不變，下次戰爭，指揮仍是舊式的。",
        outcomeB: "統一軍制的構想遭保守督撫集體反對。改革的衝動太大，守舊的阻力更大——這道牆，你第一次正面碰上了。"
      },
      rebuttal: {
        speaker: "保守將領",
        text: "**八旗乃祖宗基業**——滿清得天下靠的是八旗鐵騎！⊙\n淮軍不過借洋人之力，一時之利而已！⊙\n外籍教官之言，豈可盡信？"
      },
      persuasion: [
        { evidence: "e_enfield_rack", strength: "strong", points: 2, response: "（保守將領盯著槍架許久——他親手帶過的八旗弓手，最遠的箭也射不到那邊的木牌。）" },
        { evidence: "e_target_board", strength: "strong", points: 2, response: "保守將領數著彈孔。數到第三十發，他停了下來——**密集得連數都數不完**。" },
        { evidence: "e_formation_manual", strength: "medium", points: 1, response: "「散兵線陣⊙此乃西人之法——」將領翻到下一頁，「然⊙確有其效。」" },
        { evidence: "e_gordon_journal", strength: "medium", points: 1, response: "（保守將領逐行讀著日誌，**白紙黑字的進步速度**，比口頭爭辯更難駁。）" },
        { evidence: "e_foreign_military_advisor", strength: "weak", points: 0,
          rebuttalSpeaker: "保守將領",
          rebuttal: "**外人之言，豈足為信？**洋人自誇其法，不過誇大其詞！",
          response: "（你想起 s1_2 守舊大臣的相同說辭——「敵言不足信」是守舊派的萬用模板，需要以**中方實證**打破。）" },
        // 隱藏論據：s2_2 選 B → 在 s2_2 拾得總理衙門公文夾
        { evidence: "e_zongli_doc", strength: "strong", points: 3,
          requires: { "s2_2": "B" },
          response: "保守將領翻閱公文，神色一變：「總理衙門已諭命譯印西方操典分發各營？……如此說來，新式練兵已非地方獨斷，而是中樞既定之策。吾若仍守舊式，便是抗中樞之命矣。」" }
      ]
    },

    s2_4: {
      chapter: 2,
      title: "1872年　同文館與留美學童",
      year: "1872",
      bg: "bg-school",
      description: "課室裡傳來英文字母聲。容閎站在西裝與辮子之間，也站在兩個時代之間。",
      sceneHint: "容閎站在兩個世界的門檻上——他身上的西裝與腦後的辮子，正是整個洋務運動的縮影。",
      objects: [
        { id: "o2_4_1", label: "容閎", isCharacter: true, x: 46, y: 39, w: 12, h: 20, evidence: "e_yung_wing", closeup: "images/closeup/o2_4/o2_4_1.jpg" },
        { id: "o2_4_3", label: "英文課程教學掛圖", x: 78, y: 30, w: 13, h: 10, evidence: "e_english_chart", isPuzzleTarget: true, closeup: "images/closeup/o2_4/o2_4_3.jpg" },
        { id: "o2_4_4", label: "留美學童官方名冊", x: 37, y: 77, w: 14, h: 10, evidence: "e_students_roster", isPuzzleTarget: true, closeup: "images/closeup/o2_4/o2_4_4.jpg" },
        { id: "o2_4_5", label: "銅製六分儀", x: 92, y: 50, w: 13, h: 10, evidence: "e_sextant", isPuzzleTarget: true, closeup: "images/closeup/o2_4/o2_4_5.jpg" },
        // 陰影伏筆：剛送抵學堂的朝廷公文知照（保守反對的種子，靜靜躺在教師桌側）
        { id: "o2_4_6", label: "朝廷公文知照（未拆封）", x: 57, y: 54, w: 12, h: 8, evidence: "e_xutong_impeach", closeup: "images/closeup/o2_4/o2_4_6.jpg" }
      ],
      puzzle: {
        title: "同文館的三大功能",
        targets: ["o2_4_3", "o2_4_4", "o2_4_5"],
        requiredCount: 3,
        successMessage: "語言、人才、科學——三者合一，正是同文館超越傳統私塾的根本意義。英文掛圖是入門，名冊是承諾，六分儀是目標——學語言只是手段，掌握西方科技核心才是終點。"
      },
      dialogue: {
        speaker: "奕訢",
        text: "容閎此議，余反覆思量。⊙\n聞日本去歲已遣岩倉使團出洋，銳意效法西法——大清若能如此，二十年後局面大異。⊙\n外間或疑學童不歸……家在中國，親在中國，愛國之心豈因留洋而消？⊙\n**人才培育，是百年大計。**"
      },
      decision: {
        prompt: "留學生學成歸國後，應被派往何處？",
        choiceA: "安排為朝廷譯員與外交助手，語言人才最實用，毋須冒險廣派各界。",
        choiceB: "廣派各界——工程、礦務、鐵路、海軍——令西學滲入各行各業，推動全面現代化。",
        outcomeA: "留美學童計劃繼續，但規模受限。十年後，這批人回來，帶著詹天佑、唐紹儀的名字。",
        outcomeB: "廣派各界的方案讓徐桐大為不滿，上了一道彈劾奏摺。但你播下的種子，比他的筆墨走得更遠。"
      },
      rebuttal: {
        speaker: "徐桐",
        text: "派稚齡孩童遠赴洋地，浸淫洋俗十五載——**歸來者還是中國人嗎？**⊙\n吃洋食、穿洋衣、信洋教——此舉是自廢倫常，貽禍後代！⊙\n**寧可亡國，不可變法**——以聖學易末技，何以對列祖列宗？"
      },
      persuasion: [
        { evidence: "e_yung_wing", strength: "strong", points: 2, response: "（徐桐看著容閎的長辮——十五年的西式教育沒能剪斷它。他第一次承認，**家鄉**比學識更深。）" },
        { evidence: "e_students_roster", strength: "strong", points: 2, response: "徐桐的目光在名冊上慢慢移動。沒有說話。良久，輕嘆一聲。" },
        { evidence: "e_english_chart", strength: "medium", points: 1, response: "（徐桐抿了一下嘴角——他可以接受**「工具」**這兩個字，僅此而已。）" },
        { evidence: "e_sextant", strength: "weak", points: 0,
          rebuttalSpeaker: "徐桐",
          rebuttal: "**測天量地之術，雖巧不入聖學！**——技藝末節，何足道哉？",
          response: "（你發現面對價值觀型反對者，**工具實效類論據效用有限**——徐桐承認儀器精巧，但拒絕承認其文化地位。需以「典範」「制度」「他人之證」方能撼動價值觀本身。）" }
      ],
      combos: [
        { requires: ["e_yung_wing", "e_students_roster"],
          label: "人才養成的雙軌：典範與後繼",
          points: 5,
          response: "徐桐凝視名冊與容閎相片，緩緩搖頭：「容閎一人歸國，諸位幼童踵繼於後——不是孤例，而是制度。十五年的耕耘，已成系統。再以『迷失』為由反對，怕是難以服眾。」（你以「先驅 + 後繼者」並陳，證明留學不是個人選擇，而是國家培養人才的制度。徐桐最怕的「成系統」，正是你給他們的答案。）" }
      ]
    },

    // ========== 第三章 ==========
    s3_1: {
      chapter: 3,
      title: "1873年　輪船招商局",
      year: "1873",
      bg: "bg-port-dock",
      description: "中國旗的輪船第一次與洋行的船並泊外灘。那聲汽笛，是直接的挑戰。",
      sceneHint: "那聲汽笛，是中國人第一次以自己的旗號，與洋行在江面上正面競爭。",
      objects: [
        { id: "o3_1_1", label: "唐廷樞", isCharacter: true, x: 77, y: 45, w: 12, h: 20,
          evidence: "e_tang_tingzhu",
          closeup: "images/closeup/o3_1/o3_1_1.jpg" },
        { id: "o3_1_2", label: "黃銅招商局輪船縮模", x: 32, y: 64, w: 14, h: 11,
          evidence: "e_brass_ship_model",
          closeup: "images/closeup/o3_1/o3_1_2.jpg" },
        { id: "o3_1_3", label: "上海至天津航線掛圖", x: 48, y: 26, w: 14, h: 12,
          evidence: "e_shipping_route_map", isPuzzleTarget: true,
          closeup: "images/closeup/o3_1/o3_1_3.jpg" },
        { id: "o3_1_4", label: "洋商壟斷運費帳目", x: 80, y: 88, w: 14, h: 10,
          evidence: "e_foreign_shipping_rates", isPuzzleTarget: true,
          closeup: "images/closeup/o3_1/o3_1_4.jpg" },
        { id: "o3_1_5", label: "招商局創辦五年成效報告", x: 20, y: 88, w: 13, h: 10,
          evidence: "e_zhaoshang_first_report", isPuzzleTarget: true,
          closeup: "images/closeup/o3_1/o3_1_5.jpg" },
      ],
      puzzle: {
        title: "招商局如何打破洋商壟斷？",
        targets: ["o3_1_3", "o3_1_4", "o3_1_5"],
        requiredCount: 3,
        successMessage: "航線地圖、運費帳目、五年報告——三者並列說明：招商局以制度創新對抗洋商壟斷，成效確鑿。官督商辦，不完美，但有效。"
      },
      dialogue: {
        speaker: "唐廷樞",
        text: "自五口開埠以來，怡和、太古諸洋行壟斷長江航運，利銀流出不計其數。⊙\n招商局之設，非圖私利——**乃為奪回中國自己的江河**。⊙\n五年之內，洋商運費已降三成。**吾輩已證：華人能辦輪船。**"
      },
      decision: {
        prompt: "招商局擴展航線，應如何籌資？",
        choiceA: "向官府申請撥款，以官督商辦形式確保支持，維持現有制度。",
        choiceB: "向民間廣招商股，擴大資本基礎，給予商人更多自主經營權。",
        outcomeA: "官督商辦的框架就此定型。官府保了招商局的本，也保了對它的控制——每一個重大決策，都要等一個官印。",
        outcomeB: "商股招募比預期多，但官員的眼神變冷了。「商辦」二字，在洋務的字典裡，始終比「官督」輕。"
      },
      rebuttal: {
        speaker: "洋行買辦",
        text: "**官辦輪船，帳目不清、官員勒索！**⊙\n招商局內官員安插親友，商股何保？⊙\n不如繼續仰賴洋行——專業可靠！"
      },
      persuasion: [
        { evidence: "e_foreign_shipping_rates", strength: "strong", points: 2, response: "買辦盯著怡和的舊帳目。皺眉。「⊙運費確已降三成。」這六個字，他說得極慢。" },
        { evidence: "e_zhaoshang_first_report", strength: "strong", points: 2, response: "（買辦的指頭沿著營收欄滑下——五年內逾百萬的盈利，**這已不是「僥倖」二字可以解釋**。）" },
        { evidence: "e_brass_ship_model", strength: "medium", points: 1, response: "「一艘縮模⊙終究只是象徵——」買辦輕笑半聲，「**然招商局確已有船成隊**。」" },
        { evidence: "e_tang_tingzhu", strength: "weak", points: 0,
          rebuttalSpeaker: "洋行買辦",
          rebuttal: "**唐廷樞不過是洋行舊人**——此等人的話，怎能當真？",
          response: "（這是「人身攻擊」型反駁——對手攻擊「人」而非「事」。需以**數字實證**或**制度成效**反擊，而非辯駁人格。）" }
      ]
    },

    s3_2: {
      chapter: 3,
      title: "1881年　電報局與唐胥鐵路",
      year: "1881",
      bg: "bg-telegraph",
      description: "銅線把台灣和北京連在一起。鋼軌延向礦坑。訊息第一次走出腳力的極限。",
      sceneHint: "銅線串起一座座電報站，鋼軌延向唐山的礦坑——「自強」第一次有了真正的網絡形狀。",
      objects: [
        { id: "o3_2_1", label: "盛宣懷", isCharacter: true, x: 64, y: 38, w: 12, h: 20,
          evidence: "e_sheng_xuanhuai",
          closeup: "images/closeup/o3_2/o3_2_1.jpg" },
        { id: "o3_2_2", label: "摩斯電報機", x: 53, y: 74, w: 14, h: 11,
          evidence: "e_morse_telegraph", isPuzzleTarget: true,
          closeup: "images/closeup/o3_2/o3_2_2.jpg" },
        { id: "o3_2_3", label: "鐵路道釘", x: 17, y: 85, w: 12, h: 9,
          evidence: "e_railway_spike",
          closeup: "images/closeup/o3_2/o3_2_3.jpg" },
        { id: "o3_2_4", label: "1874年台灣防務電報延誤記錄", x: 86, y: 27, w: 14, h: 10,
          evidence: "e_taiwan_delay_1874", isPuzzleTarget: true,
          closeup: "images/closeup/o3_2/o3_2_4.jpg" },
        { id: "o3_2_5", label: "天津至上海海底電線鋪設圖", x: 21, y: 66, w: 14, h: 10,
          evidence: "e_submarine_cable_map", isPuzzleTarget: true,
          closeup: "images/closeup/o3_2/o3_2_5.jpg" },
        // 分支獎勵：s3_1 選 B 才出現
        { id: "o3_2_extra", label: "招商局營收簿冊", x: 83, y: 65, w: 10, h: 9,
          evidence: "e_zhaoshang_ledger",
          closeup: "images/closeup/o3_2/o3_2_extra.jpg",
          requires: { "s3_1": "B" } }
      ],
      puzzle: {
        title: "電報與鐵路為何是防務必需？",
        targets: ["o3_2_2", "o3_2_4", "o3_2_5"],
        requiredCount: 3,
        successMessage: "電報機、台灣延誤記錄、海底電線圖——三件並陳，足證：電報非奢侈，是生死時速。建設雖遭阻力，但最終完成，成效確鑿。"
      },
      dialogue: {
        speaker: "盛宣懷",
        text: "一八七四年，日本兵船逼近台灣。⊙\n消息傳到京師——用了三十日。⊙\n若有電報一線相連，**三十日縮為三分鐘**。⊙\n今唐胥鐵路亦已建成，煤炭運輸成本減半——**電報與鐵路，不是奢侈，是生存**。"
      },
      decision: {
        prompt: "電報與鐵路建設應如何擴展？",
        choiceA: "以軍事防務為優先，集中鋪設戰略電報線，暫緩商業鐵路擴展。",
        choiceB: "軍民並重，以鐵路帶動商業發展，以商業收益維持電報網絡運營。",
        outcomeA: "電報專為軍事服務。1884 年中法戰事傳訊仍見遲滯——北洋與閩浙之間，往往要三天才能接收回應。今天的選擇，也許剛好差了那三天。",
        outcomeB: "軍民並重的電報網絡開始盈利。盛宣懷把收益的一部分用於鋪設更多線路——良性循環，從這個選擇開始。"
      },
      rebuttal: {
        speaker: "徐桐",
        text: "電線遍地，驛站信差盡皆失業——**此乃動搖民生之舉！**⊙\n況且電線脆弱，一刀可斷——戰時敵人剪線，消息全斷，豈不更危？⊙\n**龍脈受損，社稷不寧**——洋法禍害，遠不止此！"
      },
      persuasion: [
        { evidence: "e_taiwan_delay_1874", strength: "strong", points: 2, response: "（徐桐讀完台灣延誤檔案，眉頭緊鎖——三十日的延誤是真實的，這比他往日的「龍脈」之說更難迴避。）" },
        { evidence: "e_submarine_cable_map", strength: "strong", points: 2, response: "徐桐看著海底電線示意圖，看了很久。一句話也沒說。" },
        { evidence: "e_morse_telegraph", strength: "medium", points: 1, response: "「此機器如此細小⊙」徐桐俯身細看，「**竟能傳訊千里？**」" },
        { evidence: "e_railway_spike", strength: "medium", points: 1, response: "（徐桐掂了掂那枚道釘——一枚鐵釘的重量，**繫著的是千里鐵路、千噸煤炭、千家百姓**。）" },
        { evidence: "e_sheng_xuanhuai", strength: "weak", points: 0,
          rebuttalSpeaker: "徐桐",
          rebuttal: "說得再好聽——**鐵路依然破壞龍脈**！此乃祖宗成法，不容更改！",
          response: "（「龍脈」「祖宗成法」是無從理性辯論的信念障礙——只能以**同等情感分量的災難實例**（如台灣防務之痛）撼動。）" }
      ]
    },

    s3_3: {
      chapter: 3,
      title: "1888年　開平礦務局與漢陽鐵廠",
      year: "1888",
      bg: "bg-mine",
      description: "大冶的礦、開平的煤、漢陽的爐。中國自己的人，鑄中國自己的鋼。",
      sceneHint: "那座未完工的煙囪，是「自給自足」這四個字最沉重也最具體的形狀。",
      objects: [
        { id: "o3_3_1", label: "張之洞", isCharacter: true, x: 74, y: 51, w: 12, h: 20,
          evidence: "e_zhang_zhidong",
          closeup: "images/closeup/o3_3/o3_3_1.jpg" },
        { id: "o3_3_2", label: "鑄鐵錠", x: 17, y: 80, w: 13, h: 9,
          evidence: "e_iron_ingot", isPuzzleTarget: true,
          closeup: "images/closeup/o3_3/o3_3_2.jpg" },
        { id: "o3_3_3", label: "大冶礦石樣本", x: 47, y: 76, w: 12, h: 10,
          evidence: "e_daye_ore_sample",
          closeup: "images/closeup/o3_3/o3_3_3.jpg" },
        { id: "o3_3_4", label: "漢陽鐵廠高爐設計圖", x: 54, y: 27, w: 14, h: 11,
          evidence: "e_hanyang_blueprint", isPuzzleTarget: true,
          closeup: "images/closeup/o3_3/o3_3_4.jpg" },
        { id: "o3_3_5", label: "開平礦務局年度產量報告", x: 24, y: 64, w: 14, h: 10,
          evidence: "e_kaiping_production", isPuzzleTarget: true,
          closeup: "images/closeup/o3_3/o3_3_5.jpg" },
      ],
      puzzle: {
        title: "如何建立完整的煤鐵工業鏈？",
        targets: ["o3_3_2", "o3_3_4", "o3_3_5"],
        requiredCount: 3,
        successMessage: "鑄鐵錠、高爐設計圖、產量報告——鐵廠建成、礦業增產，煤鐵工業鏈初步自立。從仰賴進口到自給自足，是洋務富國最具體的成就。"
      },
      dialogue: {
        speaker: "張之洞",
        text: "洋人堅船利炮，皆以煤鐵鑄成。⊙\n昔年江南局所需，盡購自洋商——受制於人。⊙\n今大冶出鐵、開平出煤、漢陽鐵廠初成。⊙\n**若不能自給鋼鐵，洋務永遠只是替洋人做嫁衣。**"
      },
      decision: {
        prompt: "工業資金應如何分配？",
        choiceA: "集中於軍工礦業，以保軍費自給，民用工業次之緩辦。",
        choiceB: "軍民並舉，礦業、鐵廠、紡織同步發展，構建完整工業體系。",
        outcomeA: "軍工優先，民用落後。大冶的鐵礦為炮廠服務——工業體系仍只有半邊。",
        outcomeB: "張之洞同時籌建織布局。「軍民並舉」讓漢陽成為中國最完整的工業基地——方向是對的。"
      },
      rebuttal: {
        speaker: "守舊官員",
        text: "礦廠工廠，皆是洋夷玩意！⊙\n**開礦驚擾地脈，設廠污染民居！**⊙\n況且官辦工廠，十間九虧——錢財盡入官員私囊，於國無益！"
      },
      persuasion: [
        { evidence: "e_kaiping_production", strength: "strong", points: 2, response: "（守舊官員把產量報告翻來翻去——三千噸到二十萬噸，**這串數字本身就是一篇辯詞**。）" },
        { evidence: "e_hanyang_blueprint", strength: "strong", points: 2, response: "守舊官員摸著藍圖的折痕。沒有說話。但他沒有再把那張紙推開。" },
        { evidence: "e_iron_ingot", strength: "medium", points: 1, response: "「此鑄鐵之質⊙」官員敲了敲鐵錠，金屬聲沉而紮實，「**確非舊法土爐可比**。」" },
        { evidence: "e_daye_ore_sample", strength: "medium", points: 1, response: "（守舊官員捧起礦樣，在燭光下細看——**這片土地之下，原來藏著洋務派需要的全部理由**。）" },
        { evidence: "e_zhang_zhidong", strength: "weak", points: 0,
          rebuttalSpeaker: "守舊官員",
          rebuttal: "張之洞此人，說得漂亮——但**建廠之費，錢從何來？**",
          response: "（對手以「錢從何來」轉移焦點——必須用**具體營收數據**（如招商局簿冊）反駁，證明洋務不只是耗費。）" },
        // 隱藏論據：s3_1 選 B → 在 s3_2 拾得招商局簿冊
        { evidence: "e_zhaoshang_ledger", strength: "strong", points: 3,
          requires: { "s3_1": "B" },
          response: "守舊官員翻閱簿冊，神色微變：「招商局五年盈餘逾百萬……此非空談。若商辦能盈利，那麼建廠之費，未必非從國庫支付不可。或許『官督商辦』四字，比『耗費國帑』更近實情。」" }
      ],
      combos: [
        { requires: ["e_kaiping_production", "e_hanyang_blueprint"],
          label: "重工業的兩翼：煤鐵自強",
          points: 5,
          response: "守舊官員愣了片刻：「開平日產數百噸煤，漢陽日出生鐵百噸——煤入高爐，鐵成炮管，再上戰艦。原來這不是孤立的工廠，而是一條完整的鏈。鏈一旦成形，至少在原料端，可逐步減少對洋人的依賴。」（你以「上游煤」「下游鐵」並陳，證明洋務已從點狀建設進化為產業鏈。守舊派最常用的「依賴洋人」反駁，至少在原料層面已被破除。）" }
      ]
    },

    s3_4: {
      chapter: 3,
      title: "1885年　天津武備學堂",
      year: "1885",
      bg: "bg-wubei-field",
      description: "普魯士操典、德國教官、克虜伯炮。洋務軍校，今日開課。",
      sceneHint: "雨棚下的沙盤、名冊、掛圖，是洋務三十年的縮影——外形已是洋式，靈魂仍在掙扎之中。",
      objects: [
        { id: "o3_4_1", label: "德國教官", isCharacter: true, x: 84, y: 43, w: 11, h: 18,
          evidence: "e_german_instructor",
          closeup: "images/closeup/o3_4/o3_4_1.jpg" },
        { id: "o3_4_2", label: "戰術沙盤", x: 39, y: 60, w: 15, h: 11,
          evidence: "e_sand_table", isPuzzleTarget: true,
          closeup: "images/closeup/o3_4/o3_4_2.jpg" },
        { id: "o3_4_3", label: "測距儀", x: 91, y: 59, w: 12, h: 10,
          evidence: "e_rangefinder", isPuzzleTarget: true,
          closeup: "images/closeup/o3_4/o3_4_3.jpg" },
        { id: "o3_4_4", label: "德文克虜伯炮術掛圖", x: 34, y: 26, w: 14, h: 12,
          evidence: "e_german_artillery_chart", isPuzzleTarget: true,
          closeup: "images/closeup/o3_4/o3_4_4.jpg" },
        { id: "o3_4_5", label: "學員名冊", x: 24, y: 80, w: 14, h: 10,
          evidence: "e_wubei_roster",
          closeup: "images/closeup/o3_4/o3_4_5.jpg" },
      ],
      puzzle: {
        title: "武備學堂如何超越傳統兵營訓練？",
        targets: ["o3_4_2", "o3_4_3", "o3_4_4"],
        requiredCount: 3,
        successMessage: "沙盤、測距儀、炮術掛圖——戰術推演、精確計算、科學炮術三者合一：武備學堂培訓的，是能指揮現代化戰爭的軍官，而非只懂拼殺的兵士。"
      },
      dialogue: {
        speaker: "李鴻章",
        text: "同治年間，**同文館習文**；今設武備學堂，**習武**。⊙\n德國教官每週六日操課，沙盤推演、炮術測距，皆按普魯士陸軍規範。⊙\n北洋已有鐵甲艦、克虜伯重炮——**欲用此等利器，必先培訓能用之人**。⊙\n**北洋艦隊去歲（一八八八）已正式成軍——定遠、鎮遠購自德國，乃亞洲第一**。⊙\n惟南洋水師屬沈葆楨、福建水師屬左公——**三督分立，各自為政**。他日若有戰事，三督能否協力？老夫至今未敢樂觀。"
      },
      decision: {
        prompt: "武備學堂畢業生應如何運用？",
        choiceA: "全數編入北洋各軍，充實現有武裝力量，加強海防。",
        choiceB: "分派各省協助組建新式軍隊，令全國軍備現代化，不局限北洋。",
        outcomeA: "武備學堂畢業生全數入北洋。北洋的炮，準了；北洋的指揮鏈，仍在守舊習氣裡打轉。",
        outcomeB: "分派各省的建議遭到李鴻章反對——「北洋不能分薄」。改革的意圖，在利益面前總是第一個讓步。"
      },
      rebuttal: {
        speaker: "舊式武官",
        text: "**練兵之道，在氣在膽，非在器！**⊙\n昔年關公張飛，不曾學洋人操法，亦能縱橫天下！⊙\n洋式訓練，只會令士兵忘卻勇武之本——反成軟弱之師！"
      },
      persuasion: [
        { evidence: "e_german_artillery_chart", strength: "strong", points: 2, response: "（舊式武官盯著炮術算式——他打了三十年仗，第一次發現，**戰場有一種他從未懂過的語言**。）" },
        { evidence: "e_wubei_roster", strength: "strong", points: 2, response: "武官翻到名冊最後一頁。停下。最後輕輕道：「⊙這批人，留得住。」" },
        { evidence: "e_sand_table", strength: "medium", points: 1, response: "「沙盤推演⊙」武官指著一座小山，「**地形一目了然——勝算在胸**。確有其道理。」" },
        { evidence: "e_rangefinder", strength: "medium", points: 1, response: "（武官透過測距儀看了一眼遠方靶標——黃銅鏡片裡的世界，**精確得令他這把老骨頭發冷**。）" },
        { evidence: "e_german_instructor", strength: "weak", points: 0,
          rebuttalSpeaker: "舊式武官",
          rebuttal: "洋教官說得頭頭是道——**但他們的將帥，未必願意讓學員用這套！**",
          response: "（對手點出最深的痛處：**技術可學，制度卻難動**——學了戰術，未能改革指揮鏈，正是洋務的根本局限。）" }
      ]
    },

    // ========== 第四章 ==========
    s4_1: {
      chapter: 4,
      title: "1867年　同文館論爭",
      year: "1867",
      bg: "bg-tongwenguan",
      description: "兩份奏摺並列，像兩座不肯讓開的山。爭辯聲散，寒意未消。",
      sceneHint: "倭仁反對的不是技術，而是技術背後的世界——他的憂慮是真實的，只是他開出的藥方，把改革的呼吸都封住了。",
      objects: [
        { id: "o4_1_1", label: "倭仁", isCharacter: true, x: 15, y: 35, w: 12, h: 20,
          evidence: "e_woren_person",
          closeup: "images/closeup/o4_1/o4_1_1.jpg" },
        { id: "o4_1_2", label: "倭仁反對同文館奏摺", x: 54, y: 75, w: 13, h: 10,
          evidence: "e_woren_memorial", isPuzzleTarget: true,
          closeup: "images/closeup/o4_1/o4_1_2.jpg" },
        { id: "o4_1_3", label: "奕訢增設西學章程", x: 22, y: 73, w: 13, h: 10,
          evidence: "e_yixin_proposal", isPuzzleTarget: true,
          closeup: "images/closeup/o4_1/o4_1_3.jpg" },
        { id: "o4_1_4", label: "同文館洋文教科書", x: 86, y: 74, w: 13, h: 10,
          evidence: "e_tongwenguan_textbook", isPuzzleTarget: true,
          closeup: "images/closeup/o4_1/o4_1_4.jpg" },
        { id: "o4_1_5", label: "科舉八股試卷", x: 52, y: 23, w: 14, h: 10,
          evidence: "e_keju_exam",
          closeup: "images/closeup/o4_1/o4_1_5.jpg" },
      ],
      puzzle: {
        title: "同文館論爭的核心分歧",
        description: "這場論爭，雙方各有其理。找出三件關鍵物件，掌握爭議的完整面貌。",
        type: "select-correct",
        targets: ["o4_1_2", "o4_1_3", "o4_1_4"],
        requiredCount: 3,
        successMessage: "奏摺、章程、教科書——三件並陳：倭仁反對的核心、奕訢的改革論據、爭議的實物。道統與技藝之爭，在此全貌畢現。"
      },
      dialogue: {
        speaker: "奕訢",
        text: "**天文算學，非奇技淫巧，乃富強之根本。**⊙\n西人能造炮艦，因其掌握算學；欲學其法，必先通其學。⊙\n同文館若只習語言不習科學，培養的不過是翻譯——而非能自強的人才。"
      },
      decision: {
        prompt: "同文館應否增設天文算學科？",
        choiceA: "暫緩增設，先鞏固語言翻譯培訓，以免激化朝廷矛盾。",
        choiceB: "堅持增設，以算學科技為根本，才能培養真正自強的人才。",
        outcomeA: "暫緩增設令倭仁暫時沉默。但天文算學的種子，要晚十年才在旁的學堂裡生根。",
        outcomeB: "倭仁大怒上奏請辭——奕訢趁機反將：「請倭仁另設書院，以道德講授制夷之法。」倭仁無言以對。"
      },
      rebuttal: {
        speaker: "倭仁（書信語氣）",
        text: "**立國之道，尚禮義，不尚權謀；**⊙\n**根本之圖，在人心，不在技藝。**⊙\n天文算學，不過技藝末節。引夷入夏，綱常名教將蕩然無存——⊙\n縱能造洋炮，失了人心，何以立國？"
      },
      persuasion: [
        { evidence: "e_yixin_proposal", strength: "strong", points: 2, response: "（倭仁讀完章程，將奏摺輕輕放下——他知道自己**反對的不是算學，而是「以夷變夏」的代價**。）" },
        { evidence: "e_woren_memorial", strength: "strong", points: 2, response: "「此乃吾肺腑之言。」倭仁的手指停在自己的奏摺上，停了很久。「**吾憂的，是日積月累後⊙人心之變**。」" },
        { evidence: "e_tongwenguan_textbook", strength: "medium", points: 1, response: "倭仁翻開教科書。看到一頁三角函數圖示時，他停下，盯著那條斜線——什麼都沒說。" },
        { evidence: "e_keju_exam", strength: "medium", points: 1, response: "「科舉之道⊙選才以德行文章——」倭仁的聲音放輕，「**此為根本**。算學或可補充，然不可喧賓奪主。」" },
        { evidence: "e_woren_person", strength: "weak", points: 0,
          rebuttalSpeaker: "倭仁",
          rebuttal: "**技藝之末，豈能動搖道統之本！**此乃吾之立場，至死不渝。",
          response: "（以人為論據說服那個人——是邏輯自相矛盾的。應引述能撼動其立場的**「他人」之言**，方為上策。）" }
      ]
    },

    s4_2: {
      chapter: 4,
      title: "1894年　頤和園",
      year: "1894",
      bg: "bg-garden",
      description: "石舫用大理石砌成船形，永遠無法出海。二十里外，北洋艦隊正逐年生鏽。",
      sceneHint: "那艘石舫用漢白玉砌成船形，卻永遠無法出海——三千萬軍費的最終去處，就是這個諷刺。",
      objects: [
        { id: "o4_2_1", label: "李蓮英", isCharacter: true, x: 80, y: 29, w: 11, h: 18,
          evidence: "e_lilianying_person",
          closeup: "images/closeup/o4_2/o4_2_1.jpg" },
        { id: "o4_2_2", label: "三千萬軍費挪用奏摺", x: 32, y: 62, w: 13, h: 10,
          evidence: "e_naval_fund_diverted", isPuzzleTarget: true,
          closeup: "images/closeup/o4_2/o4_2_2.jpg" },
        { id: "o4_2_3", label: "日本海軍軍費擴張比較表", x: 46, y: 49, w: 14, h: 10,
          evidence: "e_japan_naval_budget", isPuzzleTarget: true,
          closeup: "images/closeup/o4_2/o4_2_3.jpg" },
        { id: "o4_2_4", label: "北洋艦隊生鏽炮彈殼", x: 47, y: 87, w: 13, h: 10,
          evidence: "e_beiyang_aging", isPuzzleTarget: true,
          closeup: "images/closeup/o4_2/o4_2_4.jpg" },
        { id: "o4_2_5", label: "頤和園大理石建材方塊", x: 13, y: 79, w: 13, h: 10,
          evidence: "e_summer_palace_marble",
          closeup: "images/closeup/o4_2/o4_2_5.jpg" },
        // 分支獎勵：s4_1 選 B 才出現
        { id: "o4_2_extra", label: "丁韙良《富國策》譯本", x: 24, y: 55, w: 11, h: 9,
          evidence: "e_fugue_ce",
          closeup: "images/closeup/o4_2/o4_2_extra.jpg",
          requires: { "s4_1": "B" } }
      ],
      puzzle: {
        title: "追查三千萬軍費去向",
        description: "找出三件關鍵物證，揭示軍費被挪用的真相。",
        successMessage: "頤和園工程記錄、海軍軍費奏摺、日本軍備擴張表——三相印證：北洋艦隊的失血，從紙面上就已寫定。",
        targets: ["o4_2_2", "o4_2_3", "o4_2_4"],
        requiredCount: 3,
      },
      dialogue: {
        speaker: "李鴻章",
        text: "三千萬軍費，乃**北洋艦隊未來十年之血脈**。⊙\n如今……竟用以修建亭台樓閣。⊙\n日本此時正大肆擴充海軍——我等又如何與之抗衡？⊙\n（聲音壓低）⊙\n朝中或問北洋艦隊堪戰否。老夫答曰：堪。⊙\n然——**徒有其形，未足致用**：堪示外人，難當實戰。⊙\n這三十年，我等造艦設廠、購炮練兵——⊙\n**所造皆在，主之者卻不在我等手中**。"
      },
      decision: {
        prompt: "面對軍費被挪用，你會？",
        choiceA: "太后挪用軍費，我等只能默許，以免失去洋務僅餘的支持。",
        choiceB: "必須上書力諫，以國家存亡為由，阻止軍費被挪用。",
        outcomeA: "奏摺壓在桌底。慈禧的眼神比任何聖旨都清楚——洋務的邊界，就是她的容忍度。",
        outcomeB: "你遞上的奏摺換來一個月的冷遇。但丁汝昌後來私下說：「至少有人說過。」這也許已是你所能做的全部。"
      },
      rebuttal: {
        speaker: "慈禧太后",
        text: "海軍軍費，向由地方自籌，非戶部所出。⊙\n三千萬之數，乃**朝廷統籌挪移，非哀家私奪**。⊙\n頤和園修葺，乃祖宗典制，慶典所需——⊙\n爾等欲以一時軍務，凌駕大局，**置朝廷顏面於何地？**"
      },
      persuasion: [
        { evidence: "e_japan_naval_budget", strength: "strong", points: 2, response: "（慈禧看了一眼日本軍費表，眉峰微動。但她沒有放下手中的茶盞——**她不會讓步，她只是知道了**。）" },
        { evidence: "e_beiyang_aging", strength: "strong", points: 2, response: "「此事⊙容哀家再思。」她說這句時，園子裡的工匠正在敲下一塊漢白玉。" },
        { evidence: "e_naval_fund_diverted", strength: "strong", points: 2, response: "（慈禧的眼神在奏摺與李蓮英之間閃了一下——她什麼都沒說，**但李蓮英開始整理袖口**。）" },
        { evidence: "e_summer_palace_marble", strength: "medium", points: 1, response: "「石舫乃**祖宗基業**——」慈禧話沒說完，便轉頭去看湖面。" },
        { evidence: "e_lilianying_person", strength: "weak", points: 0,
          rebuttalSpeaker: "慈禧",
          rebuttal: "**蓮英乃哀家親信！**爾等勿要污衊——此話休提！",
          response: "（以「個人」為攻擊點反激起庇護心——**權力結構問題若簡化為個人**，反而失去說服力。）" }
      ]
    },

    s4_3: {
      chapter: 4,
      title: "1894年　黃海海戰指揮室",
      year: "1894",
      bg: "bg-naval",
      description: "炮聲震得艙壁滲水。南洋艦隊回電：「非我所轄。」三十年洋務，今日見分曉。",
      sceneHint: "那面破損的信號旗，是三十年洋務最沉痛的真相——我們建了艦，卻從未真正建成一支海軍。",
      // 探索完成後、進入決策前的震撼時刻（時機 Y）
      dramaticMoment: {
        date: "1894 · 9 · 17",
        place: "黃海",
        letter: [
          "汝昌奉旨統領北洋艦隊，與倭交鋒於黃海。",
          "**致遠管帶鄧世昌**，眼見彈藥將盡，下令全速撞向敵旗艦吉野。艦沉、人歿，**與愛犬太陽共沉於海**。",
          "經遠管帶林永升力戰殉國，超勇黃建勳同日葬身魚腹。",
          "電請南洋援應。回曰：「非我所轄。」",
          "電請朝廷援軍。回曰：「太后壽典，毋擾。」",
          "三十年洋務，至此見分曉。",
          "汝昌決計以死報國。非吾等之罪——",
          "**炮彈是假的，南洋不來，軍費被挪，統籌無人。**"
        ],
        signoff: "—— 北洋海軍提督　丁汝昌　絕筆"
      },
      objects: [
        { id: "o4_3_1", label: "丁汝昌", isCharacter: true, x: 26, y: 32, w: 12, h: 20,
          evidence: "e_ding_ruchang",
          closeup: "images/closeup/o4_3/o4_3_1.jpg" },
        { id: "o4_3_2", label: "沙土填充炮彈殼", x: 69, y: 84, w: 13, h: 10,
          evidence: "e_sand_shells", isPuzzleTarget: true,
          closeup: "images/closeup/o4_3/o4_3_2.jpg" },
        { id: "o4_3_3", label: "各省水師分布掛圖", x: 49, y: 26, w: 15, h: 12,
          evidence: "e_provincial_navy", isPuzzleTarget: true,
          closeup: "images/closeup/o4_3/o4_3_3.jpg" },
        { id: "o4_3_4", label: "南洋拒援電報", x: 62, y: 50, w: 13, h: 10,
          evidence: "e_nanyang_refuse", isPuzzleTarget: true,
          closeup: "images/closeup/o4_3/o4_3_4.jpg" },
        { id: "o4_3_5", label: "破損的信號旗", x: 84, y: 24, w: 11, h: 14,
          evidence: "e_signal_flag",
          closeup: "images/closeup/o4_3/o4_3_5.jpg" },
      ],
      puzzle: {
        title: "追查甲午敗因",
        description: "北洋水師的失敗，並非偶然。找出三件關鍵物件，還原制度性崩潰的真相。",
        type: "select-correct",
        targets: ["o4_3_2", "o4_3_3", "o4_3_4"],
        requiredCount: 3,
        successMessage: "沙土炮彈、各省分布圖、南洋拒援電報——三件並陳：武備腐敗、指揮分散、各省自保。三十年洋務，敗於制度，非敗於勇氣。"
      },
      dialogue: {
        speaker: "李鴻章",
        text: "三十年洋務——置了炮艦，建了工廠，辦了學堂。⊙\n今日黃海一戰，**全數付諸流水**。⊙\n不是將士不勇——丁汝昌、鄧世昌、林永升皆殉國。⊙\n**是這套制度，從根本上就走不了那一步**。⊙\n（沉默片刻）⊙\n南洋拒援、軍費被挪、炮彈是假——⊙\n老夫盡力了。但這三十年的努力，能否撐得起這個民族的明天，⊙\n**已不在老夫手中**。"
      },
      decision: {
        prompt: "面對三十年洋務的總結，你認為？",
        choiceA: "洋務已盡力而為，制度性阻力非一人之力可破，此乃時代之局限。",
        choiceB: "洋務的失敗，正說明改革必須更深入——制度不變，器物之學終究徒勞。",
        outcomeA: "「時代之局限」是最沉重的解釋，也是最誠實的。三十年已走到盡頭，歷史不等人再試一次。",
        outcomeB: "「制度不變，器物之學終究徒勞」——這句話，甲午之後才成為共識。洋務的代價，是讓後人看清了這一點。"
      },
      rebuttal: {
        speaker: "丁汝昌（遺書語氣）",
        text: "汝昌決計以死報國。⊙\n非吾等之罪——**炮彈是假的，南洋不來，軍費被挪，統籌無人**。⊙\n我們以血肉填制度之窟。⊙\n**洋務建了一支艦隊，卻沒建成一個國家。**"
      },
      persuasion: [
        { evidence: "e_sand_shells", strength: "strong", points: 2, response: "（丁汝昌捧起那枚沙土炮彈，掂了掂——比真彈輕了三成。**這不是敗於日本，是敗於自己**。）" },
        { evidence: "e_provincial_navy", strength: "strong", points: 2, response: "「四支艦隊⊙四個主人。」丁汝昌的聲音壓得很低，「我發電報，南洋回覆——**『非我所轄』**。這就是洋務的極限。」" },
        { evidence: "e_nanyang_refuse", strength: "strong", points: 2, response: "丁汝昌閉上眼。沒有說話。良久，只低聲念了一遍：「**非我所轄**。」" },
        { evidence: "e_ding_ruchang", strength: "medium", points: 1, response: "（丁汝昌的指尖在遺書上輕輕一頓——他寫過的每一個字，都早已準備迎接這一日。）" },
        { evidence: "e_signal_flag", strength: "medium", points: 1, response: "「桅桿斷了⊙信號旗升不起來⊙各艦便各自散去——」丁汝昌看著殘旗，「**一面旗，是三十年洋務的縮影**。」" },
        // 隱藏論據：s4_1 選 B → 在 s4_2 拾得《富國策》譯本
        { evidence: "e_fugue_ce", strength: "strong", points: 3,
          requires: { "s4_1": "B" },
          response: "丁汝昌接過譯本，雙手顫抖：「『國家之強弱，不在器物之精粗，而在制度之良窳』……此書 1880 年已譯就，竟無一人讀。我等血染黃海，原來真正該讀的，是這本書。」（這是最沉重的一個論據——你帶著早已存在卻未被閱讀的答案，到了結局之地。）" }
      ],
      combos: [
        { requires: ["e_sand_shells", "e_provincial_navy"],
          label: "假彈與分裂：制度的最後審判",
          points: 5,
          response: "丁汝昌將沙土炮彈與水師掛圖並陳於案上，閉目良久，終於開口：「炮彈是假的，是腐敗；艦隊是分的，是體制。前者敗在道德，後者敗在制度——兩者合而為一，便是三十年洋務的最終答案：器物可購，國魂未鑄。」（你在最後一個場景，以最沉重的兩件史料並陳——這不是說服勝利，而是與丁汝昌一同承認：這場運動從一開始，就缺了一塊根本。）" }
      ]
    }
  },

  // ======================================================
  // 史料庫（全部史料定義）
  // ======================================================
  evidence: {
    // 第一章 s1_1（1842年 虎門炮台）
    e_wounded_soldier: { name: "受傷清兵", category: "思想", content: "「洋人的槍一響——」傷兵停了停，腿上的繃帶又滲出一道血色，「我的盾還沒舉起來。炮台沒了，**我們連跑的力氣都沒有**。」——虎門守兵口述，1842 年 6 月。",
      inference: {
            "question": "受傷清兵的口述「炮台沒了，我們連跑的力氣都沒有」反映什麼？",
            "options": [
                  {
                        "text": "個人勇氣無法彌補裝備代差，是洋務「強兵」的最直接動機。",
                        "correct": true,
                        "feedback": "正是。這正是曾、李日後力主購置西式槍炮的切身體會。"
                  },
                  {
                        "text": "清軍紀律敗壞，逃兵眾多。",
                        "correct": false,
                        "hint": "傷兵說的是「無力」還是「不願」？"
                  },
                  {
                        "text": "戰爭與洋務運動無關，僅為個別事件。",
                        "correct": false,
                        "hint": "鴉片戰爭被視為洋務運動的什麼？背景還是無關？"
                  }
            ]
      }
    },
    e_british_officer_1842: { name: "英軍士官", category: "思想", content: "「中國的炮台如此原始，我們幾乎感到不忍。他們的勇氣是真實的，但武器是另一個時代的。」——英國海軍士官私人日記，1842年。對等的勇氣，不對等的武器。" },
    e_iron_cannon_ruins: { name: "清代舊式鑄鐵炮殘件", category: "思想", content: "鑄於乾隆五十年的青銅前膛炮——「龍威將軍」字樣已被海風剝蝕大半。射程三百碼，彈道平直，無法仰角。對面英艦尚在六千碼外，這門炮便已啞了。**它不是壞了，是過時了八十年**。",
      inference: {
            "question": "虎門炮台殘破的乾隆年鑄鐵炮，揭示鴉片戰爭失敗的根本原因是？",
            "options": [
                  {
                        "text": "中國武備停留在前工業時代，與西方工業革命已隔了一個時代。",
                        "correct": true,
                        "feedback": "正是。武器代差不是「個別落後」，而是文明階段的距離。"
                  },
                  {
                        "text": "炮台守將怠於職守，未能及時修繕。",
                        "correct": false,
                        "hint": "問題在「個人怠惰」還是「整個技術體系」？"
                  },
                  {
                        "text": "清廷財政不足，無錢購買新炮。",
                        "correct": false,
                        "hint": "若只是錢的問題，後來洋務運動為何要「自製」而非「購買」？"
                  }
            ]
      }
    },
    e_british_musket_1842: { name: "英軍燧發槍殘件", category: "思想", content: "英軍1840年代配備的褐貝斯燧發槍，雖非最新型，射程已達二百碼，可連射。清軍裝備仍以弓箭、刀槍、舊式火繩槍為主——一場以冷兵器對抗工業革命的戰爭，勝負早已注定。" },
    e_nanjing_treaty_draft: { name: "《南京條約》草稿", category: "思想", content: "1842 年 8 月 29 日，「皋華麗號」艦上。中文文本以工楷謄寫，朱印鮮紅：割香港、賠二千一百萬銀元、開五口、廢公行。**第一個不平等條約**——這份手稿，是百年屈辱的開頭一頁。",
      inference: {
            "question": "《南京條約》（1842）對洋務運動的催化作用是？",
            "options": [
                  {
                        "text": "首次以條約形式戳破「天朝上國」幻想，逼使開明派重新評估世界秩序。",
                        "correct": true,
                        "feedback": "對。割地、賠款、開埠的具體屈辱，比抽象議論更能撼動傳統思想。"
                  },
                  {
                        "text": "條約使中國經濟全面崩潰，洋務無從推行。",
                        "correct": false,
                        "hint": "若全面崩潰，洋務又如何在二十年後展開？"
                  },
                  {
                        "text": "條約被清廷視為小事，未引起重視。",
                        "correct": false,
                        "hint": "若未引起重視，奕訢、曾國藩為何力主自強？"
                  }
            ]
      }
    },

    // 第一章 s1_2（1860年 八里橋戰場）
    e_mongolian_cavalry: { name: "倒地的蒙古騎兵", category: "思想", content: "1860 年 9 月 21 日午後，八里橋。三萬蒙古鐵騎衝鋒——五人陣亡。聯軍代價：**陣亡五人**。倒下的騎兵手中仍緊握著弓，但弓已不夠用了。一個時代的結束，只用了三個小時。",
      inference: {
            "question": "八里橋三萬蒙古鐵騎全軍覆沒，對洋務派的啟示是？",
            "options": [
                  {
                        "text": "傳統騎射在現代炮火面前已過時，必須建立新式軍隊。",
                        "correct": true,
                        "feedback": "對。八里橋慘敗直接刺激奕訢設總理衙門、推動洋務。"
                  },
                  {
                        "text": "蒙古騎兵戰術錯誤，應改變陣型。",
                        "correct": false,
                        "hint": "陣型再變，也跨不過「弓刀對線膛炮」的時代鴻溝。"
                  },
                  {
                        "text": "戰敗主因是僧格林沁指揮失誤。",
                        "correct": false,
                        "hint": "他的個人勇敢與指揮無可指摘——問題在哪一層？"
                  }
            ]
      }
    },
    e_cavalry_saber: { name: "蒙古騎兵彎刀", category: "思想", content: "蒙古騎兵配備的傳統彎刀，工藝精湛，近身格鬥無匹。然阿姆斯特朗炮有效射程逾三千碼，騎兵在達到有效衝鋒距離之前，已在炮火中損失過半——冷兵器在現代炮火面前，勇氣與技術皆無從發揮。" },
    e_armstrong_shell: { name: "阿姆斯特朗炮炮彈殼", category: "思想", content: "黃銅彈殼，3 英寸口徑，膛線清晰可見。**阿姆斯特朗 6 磅後膛炮**，1855 年研發——射程逾三千碼，每分鐘三發。八里橋戰場上，清軍甚至沒有走到弓箭的有效射程。",
      inference: {
            "question": "阿姆斯特朗炮射程逾三千碼，清軍弓箭百碼方能傷人。這份史料對洋務運動最關鍵的啟示是？",
            "options": [
                  {
                        "text": "軍事代差不能僅靠勇氣補足，必須學習西方器物以求自強。",
                        "correct": true,
                        "feedback": "正是。八里橋一戰震動朝廷，是「師夷長技」由理論轉為共識的關鍵。"
                  },
                  {
                        "text": "中國應發展自己的火器，不應引進洋人武器。",
                        "correct": false,
                        "hint": "歷史上洋務派的選擇是「閉門自造」還是「師夷」？"
                  },
                  {
                        "text": "武器決定戰爭，因此清廷只需擴軍即可。",
                        "correct": false,
                        "hint": "洋務派除了強兵外，後來還推行了哪一項措施？"
                  }
            ]
      }
    },
    e_beijing_treaty_1860: { name: "《北京條約》停戰通牒", category: "思想", content: "1860年10月簽訂，清廷被迫增開通商口岸，賠款增至一千六百萬兩，割讓九龍半島，允許外國公使駐京，開放華工出洋。英法聯軍入侵北京，咸豐帝北狩熱河，圓明園付之一炬——京師淪陷，天朝體制徹底崩塌。" },
    e_wenxiang_notes: { name: "文祥隨軍筆記殘頁", category: "思想", content: "「夷情萬難禁絕……非通其情、習其長技，不足以制之。今京師震動，吾輩**坐而論道，已無寸進之機**。」——文祥（滿洲正紅旗人，時任軍機大臣）於八里橋戰敗後私記，1860 年 9 月。一年後，他與奕訢上奏設立總理衙門——**洋務運動由此啟動**。\n\n硝煙之下這片殘頁，是失敗者的反思，也是改革的種子。",
      inference: {
        question: "文祥這頁戰場筆記對洋務運動的關鍵意義在於？",
        options: [
          { text: "戰場上的當權者開始反思——洋務運動的種子，正是在最深的失敗中萌芽。", correct: true,
            feedback: "正是。文祥次年即與奕訢創立總理衙門——歷史的轉折，往往從一頁血淚筆記開始。" },
          { text: "證明清廷仍然執著於「禁絕夷情」的舊政策。", correct: false,
            hint: "再讀一遍：文祥說「禁絕」還是「通其情」？" },
          { text: "只是文祥個人感慨，與後續政策無關。", correct: false,
            hint: "1861 年總理衙門誰共同創立？翻看下一個場景。" }
        ]
      } },

    // 第一章 s1_3（1860年 朝廷議事廳）
    e_hanlin_scholar: { name: "翰林院學士", category: "思想", content: "「八股取士，乃選拔忠良之根本；科舉廢則人心散，人心散則天下亂。西學或有其用，然若動搖制度根基，後患無窮——此乃我等翰林之職責，寸步不讓。」——翰林院學士語，1861年。" },
    e_haiguo_tuzhi: { name: "《海國圖志》", category: "思想", content: "魏源 1843 年撰，百卷。卷首一句——「**師夷之長技以制夷**」。此書在日本流傳極廣，催生了明治維新；在清廷被斥為奇談，束之高閣。十八年後，當奕訢翻開它的時候，已晚了一個世代。",
      inference: {
            "question": "魏源《海國圖志》提出「師夷之長技以制夷」。它在洋務運動的歷史地位是？",
            "options": [
                  {
                        "text": "奠定洋務運動最早的思想綱領，主張學西方科技以自衛。",
                        "correct": true,
                        "feedback": "正是。雖然此書當時在清廷被冷待，後來成為洋務派的精神先驅。"
                  },
                  {
                        "text": "只是學者著作，與洋務派的實際決策無關。",
                        "correct": false,
                        "hint": "曾國藩、李鴻章等的奏議中是否引用過此思想？"
                  },
                  {
                        "text": "主張全面西化，被守舊派接受。",
                        "correct": false,
                        "hint": "「師夷」的範圍只是「長技」，而非全套——對比馮桂芬的「中體西用」。"
                  }
            ]
      }
    },
    e_jiao_bin_lu: { name: "《校邠盧抗議》", category: "思想", content: "馮桂芬1861年撰，提出「以中國倫常名教為原本，輔以諸國富強之術」，即後來「中學為體、西學為用」的最早表述。主張設翻譯館、派留學生、學習西方科技，但明確以儒家倫理為根基，試圖消解守舊派的顧慮。" },
    e_taiping_report: { name: "太平天國奏報", category: "思想", content: "1851年洪秀全金田起義，1853年建都天京（南京），勢力席捲半壁江山。清廷正規軍八旗、綠營皆無力抵禦——最終依靠曾國藩湘軍、李鴻章淮軍，並借助常勝軍洋槍洋炮，方才於1864年平亂。西式武器的實效，在這場平亂中得到最有力的證明。" },
    e_ever_victorious_report: { name: "常勝軍戰報", category: "思想", content: "美國人華爾編，英國人戈登續：常勝軍蘇州一役，**斃敵八千，自損二十**。戰報每頁皆附傷亡比。曾國藩讀完，於奏摺旁批：「洋槍洋炮之利，不可不察。」這份戰報，成為洋務最早的數據佐證。",
      inference: {
            "question": "常勝軍以洋槍洋炮屢勝太平軍——這份戰報對洋務派的關鍵意義是？",
            "options": [
                  {
                        "text": "證明「師夷之長技」並非空談，是可操作的實效路徑。",
                        "correct": true,
                        "feedback": "正是。曾、李親見洋槍實效後，江南、安慶的兵工廠才被力推出來。"
                  },
                  {
                        "text": "證明中國軍隊永遠不及洋人。",
                        "correct": false,
                        "hint": "常勝軍是「洋人軍」還是「中外混編」？淮軍最終獨立作戰結果如何？"
                  },
                  {
                        "text": "說明清廷應全面解散舊軍。",
                        "correct": false,
                        "hint": "洋務派的選擇是「全面取代」還是「逐步改造」？"
                  }
            ]
      }
    },

    // 第二章 s2_1（1861年 總理衙門）
    e_western_diplomat_1861: { name: "等候的西洋外交官", category: "思想", content: "「中國人終於設立了一個可以正式交涉的機構。」——1861 年駐華英國外交官私函。「在此之前，我們連對口部門都找不到。**條約需要執行，爭端需要解決——卻沒有人負責**。」總理衙門的設立，是一個遲來但重要的開始。",
      inference: {
            "question": "西洋外交官在總理衙門等候——這個畫面的歷史意義是？",
            "options": [
                  {
                        "text": "中國首次設立對等外交對口機關，告別「夷務」舊觀念。",
                        "correct": true,
                        "feedback": "正是。從「無所對接」到「正式衙門」，是觀念的根本轉變。"
                  },
                  {
                        "text": "洋人正式入侵北京政府機構。",
                        "correct": false,
                        "hint": "總理衙門是中國自設還是被迫接受？"
                  },
                  {
                        "text": "中國從此放棄獨立外交。",
                        "correct": false,
                        "hint": "蒲安臣使團、日後的外交人員，反映的是依附還是自主？"
                  }
            ]
      }
    },
    e_zongli_globe: { name: "西洋地球儀", category: "思想", content: "西洋黃銅地球儀，赤道圈刻度精細，五大洲各有色彩。1861 年總理衙門購入時，奕訢凝視許久——**「中國」二字，竟然只是球面上的一塊**。從這一刻起，「天朝」二字第一次有了裂縫。",
      inference: {
            "question": "西洋地球儀進入總理衙門——它對清廷官員的衝擊在於？",
            "options": [
                  {
                        "text": "推翻「天朝中心」幻想，接受中國只是世界眾國之一。",
                        "correct": true,
                        "feedback": "對。認識世界的形狀，是放棄「萬邦來朝」幻想的第一步。"
                  },
                  {
                        "text": "證明中國地理知識落後西方數百年。",
                        "correct": false,
                        "hint": "中國地理知識其實不落後——關鍵是「世界觀」改變。"
                  },
                  {
                        "text": "只是裝飾品，無實際影響。",
                        "correct": false,
                        "hint": "為何官員第一次看見地球儀會臉色凝重？"
                  }
            ]
      }
    },
    e_diplomatic_box: { name: "紅木外交文件盒", category: "思想", content: "紅木鎏金，內襯黃綢。盒中堆疊著各國照會、條約副本、外交備忘錄——層層疊疊，墨蹟新舊不一。從前禮部用一紙折子打發的「夷務」，如今竟需要一個衙門來收存。**從「夷」到「洋」**，差的就是這個盒子。",
      inference: {
            "question": "紅木外交文件盒內堆疊的條約、照會，象徵什麼轉變？",
            "options": [
                  {
                        "text": "中國從「被動應付」轉向「主動管理」對外關係，是制度近代化起步。",
                        "correct": true,
                        "feedback": "正是。文件盒這個小物件，承載的是觀念與制度的根本轉變。"
                  },
                  {
                        "text": "中國徹底淪為列強附庸。",
                        "correct": false,
                        "hint": "若是附庸，何須設專門衙門「主動」處理？"
                  },
                  {
                        "text": "外交僅為奕訢個人興趣。",
                        "correct": false,
                        "hint": "總理衙門是個人愛好還是體制變革？"
                  }
            ]
      }
    },
    e_foreign_sphere_map: { name: "列強在華勢力地圖", category: "思想", content: "1862 年繪。英（紅）佔長江流域、華南；俄（藍）扎東北、新疆；法（黃）覆雲南、越南；德（綠）伸山東。**色塊已侵入腹地**——中國若不主動外交，剩下的白色也會被瓜分。這張地圖，是總理衙門存在的最有力理由。",
      inference: {
            "question": "列強在華勢力地圖（1860 年代）對洋務運動的啟示是？",
            "options": [
                  {
                        "text": "若不主動外交周旋，中國將被列強蠶食瓜分——是建衙門的最有力理由。",
                        "correct": true,
                        "feedback": "正是。地圖上的紅藍色塊，比任何議論都更能說服守舊派。"
                  },
                  {
                        "text": "列強已完全瓜分中國，無從挽救。",
                        "correct": false,
                        "hint": "若已瓜分，何來「洋務運動」三十年的努力？"
                  },
                  {
                        "text": "中國應全面對外開戰。",
                        "correct": false,
                        "hint": "看清差距後，洋務派選擇「強兵自衛」還是「主動進攻」？"
                  }
            ]
      }
    },
    e_burlingame_records: { name: "蒲安臣使團記錄", category: "思想", content: "1867 年奕訢以美國外交官蒲安臣（Anson Burlingame）為首席使節。使團出訪英、美、法、德、俄五國。成果：**美國暫緩修約，列強承認中國自主改革權**。這是中國外交主動出擊的第一次成功。",
      inference: {
            "question": "1867 年蒲安臣使團出訪歐美，其歷史意義在於？",
            "options": [
                  {
                        "text": "中國首次以平等外交主動與列強交往，標誌「天朝」觀念的轉變。",
                        "correct": true,
                        "feedback": "對。這是總理衙門外交策略的具體展開，為洋務運動爭取外部喘息空間。"
                  },
                  {
                        "text": "使團失敗，列強並不承認中國地位。",
                        "correct": false,
                        "hint": "使團是否成功爭取到美國暫緩修約？"
                  },
                  {
                        "text": "此舉只是李鴻章個人爭取外交聲望。",
                        "correct": false,
                        "hint": "使團由奕訢主導，目的在「為國爭取改革時間」。"
                  }
            ]
      }
    },

    // 第二章 s2_2（1865年 江南機器製造總局）
    e_john_fryer: { name: "傅蘭雅（John Fryer）", category: "育才", content: "「我譯《汽機發軔》、《化學鑑原》——不是讓中國人崇拜西學，**而是讓他們能自行閱讀、自行改良**。當一個中國工人能照我的圖紙獨立操作蒸汽機，那一刻，知識才真正屬於中國。」——傅蘭雅，江南譯書館主任，在華 31 年。",
      inference: {
            "question": "傅蘭雅長期主持譯書館——他的工作對洋務的根本意義是？",
            "options": [
                  {
                        "text": "把西方科技知識本土化，使中國人能自主閱讀、改良，而非依賴洋人。",
                        "correct": true,
                        "feedback": "正是。「知識本土化」比「機器引進」更關鍵——傅蘭雅二十年譯書百餘種。"
                  },
                  {
                        "text": "只是個人翻譯興趣，與洋務無關。",
                        "correct": false,
                        "hint": "譯書館設於哪個機構？江南局為何要附設譯書館？"
                  },
                  {
                        "text": "證明中國技術人員能力不足。",
                        "correct": false,
                        "hint": "翻譯是「替代」還是「賦能」中國工程師？"
                  }
            ]
      }
    },
    e_bilingual_manual: { name: "中西對照技術藍圖", category: "育才", content: "左頁英文：valve、piston、cylinder。右頁中文：閥、活塞、汽缸。每個術語都是傅蘭雅與徐壽、華蘅芳一字一字商定的。**一個工人不必懂英語，也能讓蒸汽機轉動**——這就是「師夷長技」最具體的實踐。",
      inference: {
            "question": "中英對照技術藍圖的設計意義是？",
            "options": [
                  {
                        "text": "讓中國工人不必懂英語也能操作機器，是技術知識真正落地的關鍵。",
                        "correct": true,
                        "feedback": "正是。藍圖雙語化是「師夷長技」從口號變實踐的具體實踐。"
                  },
                  {
                        "text": "證明中國工人語言能力差。",
                        "correct": false,
                        "hint": "雙語化是為了「掩蓋」還是「跨越」語言障礙？"
                  },
                  {
                        "text": "為防止洋人獨佔技術而設。",
                        "correct": false,
                        "hint": "傅蘭雅的態度是「壟斷」還是「分享」技術？"
                  }
            ]
      }
    },
    e_steam_gear: { name: "蒸汽機核心齒輪", category: "強兵", content: "黃銅鑄造，齒紋精細到絲毫不差。1865 年江南局自製成功的第一組蒸汽機核心。從前安慶軍械所要四個工匠搖動曲柄才能驅動的事，如今**一台機器自己會做**。中國工業革命，從這組齒輪開始。",
      inference: {
            "question": "江南製造總局蒸汽機核心齒輪——它對「強兵」措施的關鍵意義是？",
            "options": [
                  {
                        "text": "中國工人首次親手操作西方機器，是技術從「進口」走向「自製」的起點。",
                        "correct": true,
                        "feedback": "正是。江南局不只造槍，更培養出第一代懂機械的工匠，是日後民用工業的人才庫。"
                  },
                  {
                        "text": "證明中國已能完全自主研發西方技術。",
                        "correct": false,
                        "hint": "當時技術指導與藍圖仍多來自洋人——這是學習階段，非超越階段。"
                  },
                  {
                        "text": "只有軍事用途，對民用工業毫無影響。",
                        "correct": false,
                        "hint": "日後招商局、開平煤礦的技術人才，多從哪裡培訓出來？"
                  }
            ]
      }
    },
    e_cannon_barrel: { name: "半完成的炮管", category: "強兵", content: "後膛裝彈、線膛旋轉、口徑 4 英寸——半完成的炮管尚未拋光，膛線在燭光下閃爍。1867 年江南局首批自製。**從安慶土法到江南機器**，中國軍工跨過了整整一個世代——只用了六年。",
      inference: {
            "question": "江南局以西方機器製造線膛炮——這對「強兵」措施的代表意義是？",
            "options": [
                  {
                        "text": "從「土法鑄炮」升級到「機器精製」，是工業化武備的真正起點。",
                        "correct": true,
                        "feedback": "對。安慶人力鑄炮 → 江南機器精製，是真正的技術飛躍。"
                  },
                  {
                        "text": "證明中國炮術已超越西方。",
                        "correct": false,
                        "hint": "炮的設計與機器仍主要來自西方——是「學成」非「超越」。"
                  },
                  {
                        "text": "只生產炮彈，不造炮管。",
                        "correct": false,
                        "hint": "江南局的核心產品是哪些？看物件本身（炮管）。"
                  }
            ]
      }
    },
    e_coal_iron: { name: "煤鐵原料", category: "強兵", content: "「船炮機器之用，非鐵不成，非煤不濟。」——李鴻章。煤與鐵是工業化的兩大基石，江南局的每門炮、每艘船皆從此開始。這也是日後富國措施（開礦、鐵廠）的根本動因。" },

    // 第二章 s2_3（1870年 天津練兵場）
    e_foreign_military_advisor: { name: "外籍教官", category: "強兵", content: "「中國士兵的勇氣是真實的——他們在八里橋拿著彎刀衝炮兵陣地，這需要比任何西方士兵更大的勇氣。」——某英籍教官訓練日誌，1870 年。「**問題不是勇氣，是系統**。給他們恩菲爾德、教他們散兵線——三個月後，我已無需再擔心。」",
      inference: {
            "question": "外籍教官的訓練日誌反映新式軍隊建立的關鍵是？",
            "options": [
                  {
                        "text": "勇氣不缺，缺的是現代化軍事體系——武器、陣法、指令鏈。",
                        "correct": true,
                        "feedback": "正是。教官說「中國士兵勇氣比英軍更大」，問題在「系統」。"
                  },
                  {
                        "text": "中國士兵缺乏勇氣，需洋人訓練。",
                        "correct": false,
                        "hint": "再讀一次：教官如何形容中國士兵的勇氣？"
                  },
                  {
                        "text": "洋人想藉訓練滲透中國軍隊。",
                        "correct": false,
                        "hint": "華爾、戈登的歷史評價是「侵略者」還是「協助者」？"
                  }
            ]
      }
    },
    e_enfield_rack: { name: "恩菲爾德步槍架", category: "強兵", content: "英製 1853 式恩菲爾德步槍，膛線旋轉，**有效射程 500 碼**。八旗弓箭最遠 80 碼。一架槍架擺著二十支——這就是淮軍訓練營的常規裝備。一場仗還沒開始，輸贏已在槍架上寫好。",
      inference: {
            "question": "恩菲爾德步槍取代舊式火繩槍的關鍵意義是？",
            "options": [
                  {
                        "text": "射程從 50 碼提升至 500 碼，是淮軍對舊式武裝形成壓倒性優勢的基礎。",
                        "correct": true,
                        "feedback": "對。射程的十倍躍進，使「散兵線」這種新戰術成為可能。"
                  },
                  {
                        "text": "證明中國從此不必自製武器。",
                        "correct": false,
                        "hint": "江南局、福州船政為何要自製？"
                  },
                  {
                        "text": "舊式軍隊立即被全面取代。",
                        "correct": false,
                        "hint": "湘淮軍逐步取代八旗綠營是「立即」還是「漸進」？"
                  }
            ]
      }
    },
    e_formation_manual: { name: "西式陣法操練圖", category: "強兵", content: "圖冊由戈登繪製，中英對照。左頁畫散兵線陣形：兵與兵相距三步，火力交錯覆蓋。右頁畫舊式衝鋒陣：密集前進，**一輪炮火可斃整列**。圖示之下，戈登只寫了一句：「Old way: heavy losses.」",
      inference: {
            "question": "西式陣法（散兵線、火力集中、步炮協同）取代舊式衝鋒的意義是？",
            "options": [
                  {
                        "text": "減少傷亡並大幅提升戰場效率——是「軟體」西化，與武器同樣重要。",
                        "correct": true,
                        "feedback": "正是。武器是硬體，戰術是軟體；二者並進才是真正的軍事現代化。"
                  },
                  {
                        "text": "西式陣法只是擺樣子，實戰無用。",
                        "correct": false,
                        "hint": "戈登訓練的淮軍，平太平天國的戰績如何？"
                  },
                  {
                        "text": "中國從此不再需要傳統兵法。",
                        "correct": false,
                        "hint": "曾國藩的「結硬寨、打呆仗」與西式戰術是否並存？"
                  }
            ]
      }
    },
    e_gordon_journal: { name: "戈登訓練日誌", category: "強兵", content: "中英雙語訓練日誌，逐月記錄。第三個月：**淮軍射擊精準度達英軍標準八成**。第六個月：能獨立執行散兵戰術。戈登批註：「他們學得比我預期快。」這份日誌，後來成為李鴻章奏議裡最具份量的數據附件。",
      inference: {
            "question": "戈登訓練日誌（中英雙語）的歷史價值在於？",
            "options": [
                  {
                        "text": "客觀記錄淮軍訓練成效，證明「師夷長技」可達洋人標準。",
                        "correct": true,
                        "feedback": "正是。三個月訓練即達英軍精準度八成——這是洋務最有力的數據佐證。"
                  },
                  {
                        "text": "證明中國軍人天資不如英人。",
                        "correct": false,
                        "hint": "三個月即達八成的學習速度，是「不如」還是「相當」？"
                  },
                  {
                        "text": "只是戈登個人筆記，無歷史意義。",
                        "correct": false,
                        "hint": "為何此日誌成為李鴻章奏議的重要附件？"
                  }
            ]
      }
    },
    e_target_board: { name: "木製射擊靶標", category: "強兵", content: "木製靶板，圓心三環，彈孔密集如蜂巢——尤其在十環內，幾乎連成一片。淮軍恩菲爾德步槍訓練第三個月成果。**舊式鳥槍能擊中靶心一發已是難得**。一塊木板，比千言萬語都更能說服朝廷。",
      inference: {
            "question": "靶標彈孔密集中心——這個簡單事實對洋務派意味著什麼？",
            "options": [
                  {
                        "text": "新式訓練成效可以「量化」，比口頭辯論更能說服朝廷投入經費。",
                        "correct": true,
                        "feedback": "對。具體數據是洋務派對抗守舊派最有力的武器。"
                  },
                  {
                        "text": "證明只要有彈藥，誰打都行。",
                        "correct": false,
                        "hint": "彈孔密集是「訓練成果」還是「彈藥充足」？"
                  },
                  {
                        "text": "與軍隊現代化無關。",
                        "correct": false,
                        "hint": "靶練命中率反映的是訓練體系還是個別技巧？"
                  }
            ]
      }
    },

    // 第二章 s2_4（1872年 同文館與留美學童）
    e_yung_wing: { name: "容閎", category: "育才", content: "「余以為，欲強中國，必先教育人才。吾在耶魯十五年，從未忘記自己是中國人；我選出的一百二十名學童，也不會。他們學成後帶回的，不只是工程與法律的知識，而是一種信念：中國人能做到，與洋人一樣好。」——容閎，首批留美學童選拔完成後，1872年。" },
    e_english_chart: { name: "英文課程教學掛圖", category: "育才", content: "教學掛圖，左欄英文字母，右欄漢字音譯。1862 年京師同文館首開英文課，**中國第一所系統教授西方語言的官辦學堂**。從前所有條約簽訂都倚賴洋人翻譯——往往中國因此吃虧。同文館的存在，是為了讓中國能自己讀懂條約。",
      inference: {
            "question": "京師同文館（1862）首開英文教學的歷史意義是？",
            "options": [
                  {
                        "text": "培養自主翻譯人才，擺脫對洋人翻譯（與其潛在誤導）的依賴。",
                        "correct": true,
                        "feedback": "正是。語言自主是外交主權的基礎——之前條約簽訂常因翻譯被洋人佔便宜。"
                  },
                  {
                        "text": "推行全面英語教育。",
                        "correct": false,
                        "hint": "同文館是「全民學英語」還是「精英翻譯培訓」？"
                  },
                  {
                        "text": "證明中文不足以描述西學。",
                        "correct": false,
                        "hint": "傅蘭雅譯書館已證明中文可以——同文館的功能是另一層。"
                  }
            ]
      }
    },
    e_students_roster: { name: "留美學童官方名冊", category: "育才", content: "1872 年首批留美學童名冊，120 人。年齡 9-15 歲。前十名中，有**詹天佑**（日後京張鐵路總工程師）、**唐紹儀**（民國首任國務總理）。這份名冊，是中國近代化人才庫的起點。",
      inference: {
            "question": "1872 年首批 120 名留美學童名冊的歷史意義是？",
            "options": [
                  {
                        "text": "中國首次有計劃派員系統學習西方科技，培養近代工程與政治人才。",
                        "correct": true,
                        "feedback": "正是。詹天佑（京張鐵路）、唐紹儀（國務總理）皆出自此計劃。"
                  },
                  {
                        "text": "送學童出洋是為了討好美國。",
                        "correct": false,
                        "hint": "派遣的目的是「外交禮節」還是「育才強國」？"
                  },
                  {
                        "text": "計劃成功培育大量人才。",
                        "correct": false,
                        "hint": "計劃 1881 年中途撤回——成果有，但過程曲折。"
                  }
            ]
      }
    },
    e_sextant: { name: "銅製六分儀", category: "育才", content: "黃銅六分儀，可測天體高度與經緯度。同文館課程涵蓋算學、天文、化學、測量——**用儀器看世界**，比四書五經更接近「實學」二字。學生第一次親手測出太陽高度時，那一刻，他們便不再是傳統的儒生。",
      inference: {
            "question": "同文館配備六分儀等西洋科學儀器，象徵教育的什麼轉變？",
            "options": [
                  {
                        "text": "從「四書五經」式背誦走向「測量、實驗」式科學訓練。",
                        "correct": true,
                        "feedback": "正是。教學工具的轉變，反映的是學問範式的轉變。"
                  },
                  {
                        "text": "中國從此廢除傳統教育。",
                        "correct": false,
                        "hint": "同文館與科舉是「取代」還是「並行」？"
                  },
                  {
                        "text": "六分儀僅供裝飾。",
                        "correct": false,
                        "hint": "課程明確包含天文、測量——儀器是教具，非裝飾。"
                  }
            ]
      }
    },
    e_xutong_impeach: { name: "徐桐彈劾留學奏議", category: "思想", content: "「夷學害道——幼童赴美，吃洋食、穿洋衣、學洋語、信洋教，**歸來者已非華人**。臣懇請朝廷立即停止派遣，召回學童，以正人心、護道統。」——徐桐（翰林院掌院學士）彈劾留學計劃奏議節錄。1881 年留學計劃中斷召回，**徐桐之言實為主因之一**。\n\n洋務尚在啟動，反對的力量已經集結——這份奏議，是洋務初期最早的陰影。",
      inference: {
        question: "徐桐這份奏議，揭示了洋務運動的什麼根本困境？",
        options: [
          { text: "改革剛起步，反對的勢力已從朝廷內部集結——洋務從第一日就背著保守派的攻擊。", correct: true,
            feedback: "正是。徐桐 1881 年成功令留學中斷，奠定了洋務派任何「新事」皆需政治苦戰的格局。" },
          { text: "證明留學計劃完全失敗。", correct: false,
            hint: "詹天佑、唐紹儀皆是這 120 人之一——失敗還是成功？" },
          { text: "徐桐個人偏見，無代表性。", correct: false,
            hint: "「寧可亡國，不可變法」是徐桐個人言論，還是當時保守派共識？" }
        ]
      } },

    // 第三章
    e_brass_ship_model: { name: "黃銅招商局輪船縮模", category: "求富", content: "黃銅鑄造的招商局輪船縮模，船身刻有「**輪船招商局**」六字。1873 年成立，向洋行購入第一批輪船，正式以「官督商辦」形式經營沿海航運。怡和、太古的鐵甲船霸權，第一次有了競爭者。" },
    e_shipping_route_map: { name: "上海至天津航線掛圖", category: "求富", content: "牆掛航線地圖，紅線標出招商局的航線：上海—天津、上海—廣州、長江內河。1878 年數據：**招商局已奪回長江航運的三成份額**。怡和的運費——首次被迫下降。",
      inference: {
            "question": "招商局五年內奪回部分沿海航運利權——這對「求富」的關鍵意義是？",
            "options": [
                  {
                        "text": "「挽回利權」由口號變實效，證明官督商辦可與洋商正面競爭。",
                        "correct": true,
                        "feedback": "正是。這是洋務派「以商制夷」的第一次具體勝利。"
                  },
                  {
                        "text": "中國從此完全壟斷沿海航運。",
                        "correct": false,
                        "hint": "「奪回部分」是真實的——但「完全壟斷」並未實現。"
                  },
                  {
                        "text": "證明洋商已退出中國。",
                        "correct": false,
                        "hint": "怡和、太古至民國時期仍在華經營——是「競爭」非「驅逐」。"
                  }
            ]
      }
    },
    e_foreign_shipping_rates: { name: "洋商壟斷運費帳目", category: "求富", content: "怡和輪船公司 1872 年帳目影本：上海至天津，每擔運費三錢二分。中國商人可負擔的水準：每擔二錢——**整整高出五成**。利權外流不是抽象詞彙，是每船貨、每年數十萬兩白銀的具體流失。",
      inference: {
            "question": "怡和輪船公司運費比中國商人可負擔的高出三至五成——這對洋務派意味著？",
            "options": [
                  {
                        "text": "不平等的外貿結構正在掏空中國經濟，是「求富」轉向的根本動機。",
                        "correct": true,
                        "feedback": "正是。「利權外流」不是抽象概念，是具體可見的數字。"
                  },
                  {
                        "text": "洋商定價合理，無需挑戰。",
                        "correct": false,
                        "hint": "若合理，為何招商局成立後洋商被迫降價？"
                  },
                  {
                        "text": "中國應完全閉關鎖國。",
                        "correct": false,
                        "hint": "洋務派的選擇是「閉關」還是「自建企業競爭」？"
                  }
            ]
      }
    },
    e_zhaoshang_first_report: { name: "招商局創辦五年成效報告", category: "求富", content: "唐廷樞 1878 年向李鴻章呈報：**五年內購入輪船十六艘，年節省運費逾百萬兩**，怡和、太古被迫降價。報告末頁，李鴻章硃批四字——「**官督商辦**，可行」。這四字，啟動了洋務後期所有民用工業。",
      inference: {
            "question": "招商局創辦五年成效報告（1878）的意義在於？",
            "options": [
                  {
                        "text": "用具體營收數據證明洋務後期措施有效，為後續富國措施鋪路。",
                        "correct": true,
                        "feedback": "正是。沒有招商局的成功先例，電報、礦務、鐵廠難以說服朝廷投入。"
                  },
                  {
                        "text": "報告誇大成績，實際虧損。",
                        "correct": false,
                        "hint": "怡和、太古因招商局競爭而被迫降價——這是真實的市場反應。"
                  },
                  {
                        "text": "招商局從此完全民營化。",
                        "correct": false,
                        "hint": "「官督商辦」的「官督」始終存在——這也是日後問題之源。"
                  }
            ]
      }
    },
    e_morse_telegraph: { name: "摩斯電報機", category: "求富", content: "黑色木匣，黃銅電鍵，旁置長條紙帶。1881 年 12 月 28 日，盛宣懷按下天津至上海的第一份電報——**「萬古一日」**四字傳到南方。從信差三十日到電流三分鐘，**中國的時間第一次被壓縮**。",
      inference: {
            "question": "看見這台電報機，你認為它對洋務運動的最關鍵意義是？",
            "options": [
                  {
                        "text": "突破腳力極限，使軍情傳遞由月縮為分——強兵不足、必須求富的時代產物。",
                        "correct": true,
                        "feedback": "對。1874 日本侵台時消息傳到京師需 30 日，這就是電報出現的根本原因。"
                  },
                  {
                        "text": "破壞傳統商業秩序，是洋人經濟侵略的工具。",
                        "correct": false,
                        "hint": "誰主持電報局？目的是商業擴張還是國防需求？"
                  },
                  {
                        "text": "盛宣懷個人才能的展示，與時代趨勢無關。",
                        "correct": false,
                        "hint": "看物件背後的「制度需求」，不是個人英雄主義。"
                  }
            ]
      }
    },
    e_railway_spike: { name: "鐵路道釘", category: "求富", content: "鑄鐵道釘，鏽蝕略可見。1881 年唐胥鐵路（唐山—胥各莊）所用，**全長 9.7 公里，中國第一條自建鐵路**。為避朝廷忌諱，初期以騾馬牽引，後悄悄換上蒸汽機車。一枚道釘的長度，是中國鐵路網的起點。" },
    e_taiwan_delay_1874: { name: "1874年台灣防務電報延誤記錄", category: "求富", content: "1874 年 5 月 17 日，朝廷檔案：日軍登陸台灣，**消息傳到京師耗時三十二日**——當朝廷知道時，事已四十日。這份延誤檔案，是李鴻章力主建設電報網絡最核心的論據。**防務之痛，是現代化的最大動力**。",
      inference: {
            "question": "1874 年台灣防務電報延誤三十日——這條檔案如何推動洋務後期改革？",
            "options": [
                  {
                        "text": "防務危機成為現代化的最大動力，使「強兵」必然導向「求富」（建電報網）。",
                        "correct": true,
                        "feedback": "正是。日本侵台是洋務目標轉變的最關鍵歷史事件。"
                  },
                  {
                        "text": "證明清廷無能應付突發事件。",
                        "correct": false,
                        "hint": "問題在「人」還是「基礎設施」？"
                  },
                  {
                        "text": "與電報建設無關。",
                        "correct": false,
                        "hint": "為何此事件後立即推動天津電報局？"
                  }
            ]
      }
    },
    e_submarine_cable_map: { name: "天津至上海海底電線鋪設圖", category: "求富", content: "1883 年鋪設示意圖：天津—煙台—上海—廣州—香港。1885 年 3 月，法軍進犯台灣，**清廷二十分鐘內得報**——比 1874 年快了八萬六千四百倍。一條銅線，重塑了戰時情報的地理。",
      inference: {
            "question": "天津至上海海底電線（1883）的戰略意義是？",
            "options": [
                  {
                        "text": "建立國防神經系統，使戰時情報傳遞由月縮為分。",
                        "correct": true,
                        "feedback": "正是。1885 法軍進犯台灣，清廷二十分鐘內得報——比 1874 大有改善。"
                  },
                  {
                        "text": "純為商業貿易而設。",
                        "correct": false,
                        "hint": "電報線為何沿海防要點鋪設？"
                  },
                  {
                        "text": "技術完全自主，未用洋人技術。",
                        "correct": false,
                        "hint": "電報是引進技術——但運營與管理是中國自主。"
                  }
            ]
      }
    },
    e_iron_ingot: { name: "鑄鐵錠", category: "求富", content: "1894 年漢陽鐵廠首批鑄鐵錠，重約十斤，編號「漢一」。**中國首次以本土煤鐵自鑄出符合工業標準的鋼鐵**。從前要從洋商買到的鐵，如今從大冶礦坑、開平煤礦、漢陽高爐這條鏈出來。",
      inference: {
            "question": "漢陽鐵廠首批鑄鐵錠的歷史意義是？",
            "options": [
                  {
                        "text": "中國首次以本土煤鐵鑄出符合工業標準的鋼鐵，是重工業自給的起點。",
                        "correct": true,
                        "feedback": "正是。從仰賴進口到自給雛形，這一錠鐵承載重大象徵意義。"
                  },
                  {
                        "text": "證明中國鋼鐵已超越西方。",
                        "correct": false,
                        "hint": "漢陽初期品質仍與西方有距離——是「起步」非「超越」。"
                  },
                  {
                        "text": "純為張之洞私人營利。",
                        "correct": false,
                        "hint": "漢陽鐵廠是官辦還是私辦？產品供應對象是誰？"
                  }
            ]
      }
    },
    e_daye_ore_sample: { name: "大冶礦石樣本", category: "求富", content: "大冶鐵礦礦石樣本，鐵含量高達六成五。1891年大冶鐵礦正式開採，為漢陽鐵廠提供穩定原料——開平出煤、大冶出鐵、漢陽冶煉，形成中國第一條完整煤鐵產業鏈。" },
    e_hanyang_blueprint: { name: "漢陽鐵廠高爐設計圖", category: "求富", content: "藍紙白線，標明三座**五十噸日產量**的煉鋼高爐。張之洞 1888 年籌建，1894 年投產——**中國最大的鋼鐵聯合企業**。配合大冶鐵礦與開平煤礦，是「煤鐵自給」這四個字最具體的形狀。",
      inference: {
            "question": "漢陽鐵廠的高爐設計圖，對中國近代工業的意義是？",
            "options": [
                  {
                        "text": "中國首次嘗試以本土煤鐵建立完整重工業鏈，目的是擺脫對洋鐵的依賴。",
                        "correct": true,
                        "feedback": "對！配合大冶鐵礦與開平煤礦，這是「煤鐵自給」的具體實踐。"
                  },
                  {
                        "text": "證明中國已超越西方鋼鐵技術。",
                        "correct": false,
                        "hint": "漢陽鐵廠初期生產品質與西方仍有距離，是「起步」非「超越」。"
                  },
                  {
                        "text": "只是張之洞個人政績，與整體洋務無關。",
                        "correct": false,
                        "hint": "漢陽鐵廠生產的鋼鐵供哪些洋務企業使用？"
                  }
            ]
      }
    },
    e_kaiping_production: { name: "開平礦務局年度產量報告", category: "求富", content: "唐廷樞 1881 年至 1891 年產量報告：**從 3,000 噸增至 250,000 噸**——十年八十倍。煤炭供應北洋艦隊與唐胥鐵路。這串數字，是抗擊「洋務無用論」最有力的反駁。",
      inference: {
            "question": "開平煤礦十年內產量從三千噸增至二十五萬噸——這個數字反映什麼？",
            "options": [
                  {
                        "text": "工業化的指數級成長，洋務後期具體可量化的成果。",
                        "correct": true,
                        "feedback": "正是。具體數據是抗擊「洋務無用論」最有力的反駁。"
                  },
                  {
                        "text": "煤礦資源即將耗盡。",
                        "correct": false,
                        "hint": "增產反映的是「枯竭」還是「擴張」？"
                  },
                  {
                        "text": "中國從此不需進口任何能源。",
                        "correct": false,
                        "hint": "二十五萬噸供給北洋艦隊與唐胥鐵路——是否足夠全國？"
                  }
            ]
      }
    },
    e_sand_table: { name: "戰術沙盤", category: "強兵", workshopExclude: true, content: "帆布軍帳內的沙盤，標記山丘、河流、橋梁。錫製小兵分敵我兩色，黃銅指揮棍擱在旁邊。1885 年武備學堂從普魯士引進——**戰術從口頭講解變成可視化推演**。學員們第一次看見「地形」這個概念，是立體的。",
      inference: {
            "question": "戰術沙盤推演取代口頭講解——這代表軍事教育的什麼轉變？",
            "options": [
                  {
                        "text": "從「個人勇武」轉向「科學指揮」，是現代軍官培訓的核心方法。",
                        "correct": true,
                        "feedback": "正是。沙盤讓地形、戰術、預判可視化——這是現代戰爭的思維方式。"
                  },
                  {
                        "text": "沙盤推演只是遊戲。",
                        "correct": false,
                        "hint": "為何普魯士陸軍將沙盤列為必修課？"
                  },
                  {
                        "text": "中國從此放棄傳統兵法。",
                        "correct": false,
                        "hint": "孫子兵法與沙盤推演是「對立」還是「互補」？"
                  }
            ]
      }
    },
    e_rangefinder: { name: "測距儀", category: "強兵", workshopExclude: true, content: "黃銅炮兵測距儀，木製三腳架。鏡片 19 世紀末德國工藝。**炮兵不再憑經驗估距——而是以數學測得**。武備學堂課程因此必修代數、三角。從此，「軍人需懂科學」這六個字，有了具體形狀。",
      inference: {
            "question": "炮兵測距儀的引進，象徵新式軍官需要什麼？",
            "options": [
                  {
                        "text": "數學運算能力——「炮術」已是科學，非個人經驗可替代。",
                        "correct": true,
                        "feedback": "正是。武備學堂課程必修數學，這是「軍人需懂科學」的具體實踐。"
                  },
                  {
                        "text": "測距儀只是花俏裝備。",
                        "correct": false,
                        "hint": "歐洲軍隊為何將測距儀視為標準配備？"
                  },
                  {
                        "text": "中國軍官天資不如歐人。",
                        "correct": false,
                        "hint": "問題是「天資」還是「訓練體系」？"
                  }
            ]
      }
    },
    e_german_artillery_chart: { name: "德文克虜伯炮術掛圖", category: "強兵", workshopExclude: true, content: "德文掛圖，1882 年克虜伯炮術圖解：**炮管剖面、彈道拋物線、仰角換算表**。每一行字下，學員都用毛筆抄寫中文翻譯。從買炮到造炮、從用炮到懂炮——**整套引進普魯士軍事體系**，是制度西化最大膽的一步。",
      inference: {
            "question": "德文克虜伯炮術掛圖出現在學堂——它對洋務軍事改革的意義是？",
            "options": [
                  {
                        "text": "從「整套引進普魯士軍事體系」中可見洋務派承認制度西化的必要。",
                        "correct": true,
                        "feedback": "正是。學堂規範整套照搬普魯士，是制度西化的最大膽嘗試。"
                  },
                  {
                        "text": "德國強迫中國使用其軍備。",
                        "correct": false,
                        "hint": "選擇普魯士模式是清廷主動還是被迫？"
                  },
                  {
                        "text": "只買炮，不學戰術。",
                        "correct": false,
                        "hint": "若只買炮，何須開學堂教德文戰術？"
                  }
            ]
      }
    },
    e_wubei_roster: { name: "學員名冊", category: "育才", content: "武備學堂學員名冊，每頁五人。各省保薦，年齡 18-25。其中**段祺瑞、馮國璋、王士珍**——日後北洋三傑，皆出此處。一冊名單，是中國近代軍官的搖籃。" },

    // 第三章 人物
    e_tang_tingzhu: { name: "唐廷樞", category: "求富", content: "「怡和、太古二洋行壟斷航運三十年……五年下來，洋商主動降價三成——不是因為他們仁慈，是因為他們知道，我們已是真正的競爭對手。」——唐廷樞，輪船招商局首任總辦，1878年。唐廷樞本為買辦，卻以洋行經驗反過來與洋行競爭，是洋務富國中商業本土化的最佳典範。" },
    e_sheng_xuanhuai: { name: "盛宣懷", category: "求富", content: "「一八七四年，日本兵船逼台，消息遲三十日始達北京……電報不是奢侈，是生死之速。」——盛宣懷，南北洋電報總局督辦，1881年。盛宣懷主持建設天津至上海電報線，又監督唐胥鐵路工程，是官督商辦體制下最成功的洋務實務官員之一。" },
    e_zhang_zhidong: { name: "張之洞", category: "求富", content: "「洋人的炮是鋼鐵鑄的……若不能自給鋼鐵，洋務永遠只是替洋人做嫁衣。」——張之洞，湖廣總督，1894年。張之洞以漢陽鐵廠為核心，試圖建立中國完整的煤鐵工業鏈，提出「中學為體、西學為用」，是晚清洋務思想的最後一位重量級倡導者。" },
    e_german_instructor: { name: "德國教官", category: "強兵", content: "「普魯士在1870年以炮術和參謀制度打敗法國，靠的是精確計算和統一指揮……問題是，你們的將帥願意讓他們用嗎？」——天津武備學堂德國教官，1888年。這句反問，道出洋務軍事改革的根本困境：器械可引進，制度能否真正改變？" },

    // 第四章
    e_woren_person: { name: "倭仁", category: "思想", content: "「立國之道，尚禮義，不尚權謀；根本之圖，在人心，不在技藝……設若人心盡失，縱有洋炮千門，亦守不住中國！」——倭仁，大學士、理學領袖，1867年上書反對同文館增設算學科。倭仁代表清廷中堅的道學守舊派，其反對並非無知，而是對文化本位的深切執著。" },
    e_woren_memorial: { name: "倭仁奏摺", category: "思想", content: "倭仁《請罷同文館天文算學館折》（1867）。核心兩句：「**立國之道，尚禮義，不尚權謀；根本之圖，在人心，不在技藝**。」此摺以儒家道統為盾，是守舊派最具影響力的論述。它沒能阻止算學館成立，卻奠定了反洋務的理論基礎。",
      inference: {
            "question": "倭仁《請罷同文館天文算學館折》的核心立場是？",
            "options": [
                  {
                        "text": "「立國在人心，不在技藝」——以儒家道統反對科技教育，是守舊派最具代表性的論述。",
                        "correct": true,
                        "feedback": "正是。倭仁的論點不是「反洋」，而是「重道輕技」——是另一套世界觀。"
                  },
                  {
                        "text": "倭仁主張全面學西方。",
                        "correct": false,
                        "hint": "倭仁是改革派還是守舊派？"
                  },
                  {
                        "text": "倭仁此奏無人響應。",
                        "correct": false,
                        "hint": "倭仁背後有龐大守舊集團——奕訢的算學館因此一度遭擱置。"
                  }
            ]
      }
    },
    e_naval_fund_diverted: { name: "三千萬軍費挪用奏摺", category: "思想", content: "1894 年 3 月，奏摺殘卷：「**海軍經費移撥工程**」八字，硃印赫然。三千萬兩白銀——本應為北洋更新十年的軍備——流入頤和園的湖石與琉璃。日本同期海軍預算逐年遞增，**雙方此消彼長**。",
      inference: {
            "question": "三千萬北洋軍費被挪建頤和園——這份奏摺說明洋務失敗的哪一深層原因？",
            "options": [
                  {
                        "text": "制度性腐敗與專制體制下，改革成果可被一人意志輕易摧毀。",
                        "correct": true,
                        "feedback": "正是。慈禧的個人意志凌駕國防需求，是「中體」框架下的必然結果。"
                  },
                  {
                        "text": "洋務派不夠努力爭取軍費。",
                        "correct": false,
                        "hint": "李鴻章曾多次力諫——是「不能」還是「不為」？"
                  },
                  {
                        "text": "軍費不足是技術問題，與制度無關。",
                        "correct": false,
                        "hint": "日本明治政府為何能集中全國財力擴軍？對比兩國政體的差異。"
                  }
            ]
      }
    },
    e_japan_naval_budget: { name: "日本海軍軍費擴張比較表", category: "思想", content: "比較表（外務省檔案，1894）：**日本 1880 年海軍預算 800 萬日元，1894 年 1,800 萬——逐年遞增**。中國北洋同期：**1888 年成軍，1894 年仍未更新**。一張表格，比千言萬語都更說明甲午為何必敗。",
      inference: {
            "question": "1880-90 年代日本海軍軍費年年遞增，中國北洋十年未更新——這反映什麼？",
            "options": [
                  {
                        "text": "兩國體制差異：日本有統一財政與威權集中，中國則被慈禧個人意志癱瘓。",
                        "correct": true,
                        "feedback": "正是。同樣面對西方衝擊，制度的根本差異決定了改革深度。"
                  },
                  {
                        "text": "日本經濟比中國發達。",
                        "correct": false,
                        "hint": "1894 年日本人均 GDP 仍低於中國——關鍵不是財富總量。"
                  },
                  {
                        "text": "中國軍費已足夠，無需增加。",
                        "correct": false,
                        "hint": "若足夠，何來「沙土炮彈」與「艦隊老化」？"
                  }
            ]
      }
    },
    e_beiyang_aging: { name: "北洋艦隊生鏽炮彈殼", category: "思想", content: "**北洋艦隊鐵甲艦明細（1894）**：定遠、鎮遠——1881 年下水，已 13 年；致遠、靖遠——1887 年，7 年。**沒有一艘是 1888 年成軍後新造的**。海軍科技每五年一代，北洋已老了三代。生鏽的炮彈殼，只是表象。",
      inference: {
            "question": "北洋艦隊鐵甲艦十年未更新——這個事實說明洋務的什麼局限？",
            "options": [
                  {
                        "text": "「強兵」成果若無持續資金更新，會在十年內被時代追過。",
                        "correct": true,
                        "feedback": "正是。1888 年成軍時北洋為亞洲第一，1894 年已被日本反超——這是體制問題。"
                  },
                  {
                        "text": "鐵甲艦本來就不需要更新。",
                        "correct": false,
                        "hint": "海軍科技每五年代際差異多少？日本同期添購了多少新艦？"
                  },
                  {
                        "text": "李鴻章不關心海軍維護。",
                        "correct": false,
                        "hint": "李鴻章每年向朝廷申請軍費——問題在「能否得到」。"
                  }
            ]
      }
    },
    e_lilianying_person: { name: "李蓮英", category: "思想", content: "「太后的壽辰，是天下的大事……太后高興，皇上才安心，朝廷才穩定。」——李蓮英，慈禧貼身太監，1888年。（據史料情境重構）李蓮英實際掌握太后起居一切，頤和園工程由其監管，軍費挪用的細目亦經其手核准——宮廷腐敗的樞紐，往往是這些看似低微的角色。" },
    e_summer_palace_marble: { name: "頤和園大理石建材方塊", category: "思想", content: "石舫（清晏舫）所用漢白玉大理石方塊，採自房山。頤和園1888年重建，耗費約三千萬兩，全數來自本應撥給北洋水師的軍費。這艘永遠停泊的石舫，以船的外形，用海軍的錢建造，卻永遠無法出海——洋務三十年的最大悲劇，莫過於此。" },
    e_provincial_navy: { name: "各省水師分布掛圖", category: "思想", content: "各省水師分布掛圖（1894）：**北洋、南洋、福建、廣東——四支艦隊，四個總督，四套指揮系統**。從未真正合一。中央想統一，地方不放權；戰時各艦各艦，各自為政。這張圖，是制度問題的縮影。",
      inference: {
            "question": "各省水師分布掛圖（北洋／南洋／福建／廣東四支）反映洋務的什麼根本問題？",
            "options": [
                  {
                        "text": "缺乏全國統籌，「中央放任地方各辦」使海防永遠無法形成合力。",
                        "correct": true,
                        "feedback": "正是。四支艦隊四個主人——這是體制問題，非單純策略失誤。"
                  },
                  {
                        "text": "中國海防完備，分區管理合理。",
                        "correct": false,
                        "hint": "若合理，為何戰時無法集中兵力？對比日本聯合艦隊。"
                  },
                  {
                        "text": "李鴻章獨佔軍權所致。",
                        "correct": false,
                        "hint": "李鴻章是「想統一」還是「想獨佔」？看他的奏議內容。"
                  }
            ]
      }
    },
    e_nanyang_refuse: { name: "南洋拒援電報", category: "思想", content: "1894 年 9 月 17 日，南洋艦隊覆電北洋：「**非我所轄**。」四個字，墨蹟新鮮。電報紙下，是丁汝昌跪在指揮室地上的身影。**洋務三十年建了艦隊，卻沒建成一支海軍**——四個字，道盡這一切。",
      inference: {
            "question": "南洋艦隊以「非我所轄」拒絕馳援北洋——這四個字最沉痛的歷史意義是？",
            "options": [
                  {
                        "text": "洋務三十年建了艦隊，卻沒建成統一的「國家海軍」概念——根本之敗在制度。",
                        "correct": true,
                        "feedback": "正是。丁汝昌遺書所云「我們建了艦，卻沒建成一個國家」，正是此意。"
                  },
                  {
                        "text": "純為兩位將軍個人恩怨。",
                        "correct": false,
                        "hint": "「非我所轄」是個人選擇還是制度規範？"
                  },
                  {
                        "text": "南洋艦隊實力不足以馳援。",
                        "correct": false,
                        "hint": "若是實力問題，為何用「非我所轄」這樣的制度語言？"
                  }
            ]
      }
    },
    e_yixin_proposal: { name: "奕訢增設西學章程", category: "思想", content: "1867 年奕訢《同文館增設天文算學館章程》：「**天文算學，非奇技淫巧，乃富強之根本**。」奏摺主張選拔翰林進士入館學習科學——這是改革派挑戰守舊派最大膽的一次嘗試。最終獲准，但代價慘重。",
      inference: {
            "question": "奕訢《同文館增設西學章程》的關鍵主張是？",
            "options": [
                  {
                        "text": "天文算學是富強之根本，西學需從基礎科學起步而非僅學語言。",
                        "correct": true,
                        "feedback": "正是。奕訢看出：只學翻譯不學科學，培養的是翻譯而非自強人才。"
                  },
                  {
                        "text": "主張全面廢除科舉。",
                        "correct": false,
                        "hint": "奕訢的立場是「並存」還是「廢除」？"
                  },
                  {
                        "text": "此章程從未實施。",
                        "correct": false,
                        "hint": "雖遭倭仁反對，但增設天文算學科最終獲准——這是改革派的勝利。"
                  }
            ]
      }
    },
    e_tongwenguan_textbook: { name: "同文館洋文教科書", category: "育才", content: "同文館教材：《幾何原本》（徐光啟譯）、《代微積拾級》（李善蘭譯）。**三角函數表、幾何證明、微積分入門**——清廷子弟第一次接觸到「實證」式學問。教材是制度的具體化，沒有它，西學只能停留在空談。",
      inference: {
            "question": "同文館教科書（含算學、天文）的歷史價值在於？",
            "options": [
                  {
                        "text": "把「西學」從口號變成可教可考的具體課程，是教育近代化的物質起點。",
                        "correct": true,
                        "feedback": "正是。教材是制度的具體化——沒有教材，西學永遠停留在口頭主張。"
                  },
                  {
                        "text": "教科書全為英文，學生看不懂。",
                        "correct": false,
                        "hint": "同文館為何同時設語言課？"
                  },
                  {
                        "text": "教科書與洋務運動無關。",
                        "correct": false,
                        "hint": "同文館本身就是洋務運動「育才」的核心。"
                  }
            ]
      }
    },
    e_keju_exam: { name: "科舉八股試卷", category: "思想", content: "清代八股取士的標準試題，規定格式：破題、承題、起講、入手、起股、中股、後股、束股，字數嚴格，不得逾矩。倭仁等守舊派認為此制度選拔忠正賢良，是治國根本。然而批評者指出，八股制度令士子只會詞章，不能應對外患——洋務所需的數學、工程、語言，全不在考試之列。科舉與洋務，是兩套根本上互不相容的知識體系。" },
    e_ding_ruchang: { name: "丁汝昌遺書", category: "思想", content: "「汝昌決計以死報國……今日非汝昌所能救，非一人之力，乃制度積弊之必然。北洋之設備，南洋之不援，朝廷之挪用——吾等以血肉之軀，填制度之窟，豈有勝算？」——丁汝昌，北洋水師提督，1895年2月威海衛陷落後服毒自盡。其遺書既是對三十年洋務的沉痛總結，也是對整個體制的最後控訴。非為失敗而死，而為制度性悲劇殉節。" },
    e_sand_shells: { name: "沙土填充炮彈殼", category: "思想", content: "黃海戰場拾獲，重量比真彈輕了三成——剖開：**沙土填充，無爆炸藥**。產自天津機器局，由克虜伯彈藥司「監造」。一發炮彈的造價，被驗收官員、軍火承辦商、地方衙門層層剋扣。**敗於日本之前，洋務已敗於自己**。",
      inference: {
            "question": "北洋艦隊發現大量沙土填充的炮彈——這個事實揭示洋務運動的根本問題是？",
            "options": [
                  {
                        "text": "官督商辦下監察缺失，制度腐敗令最關鍵的「強兵」成果被掏空。",
                        "correct": true,
                        "feedback": "正是。即使艦炮再先進，制度腐敗令洋務從根爛起——丁汝昌之痛。"
                  },
                  {
                        "text": "日本軍工技術勝過中國。",
                        "correct": false,
                        "hint": "問題出在「炮彈質量」還是「日本」？"
                  },
                  {
                        "text": "丁汝昌指揮失誤所致。",
                        "correct": false,
                        "hint": "炮彈是誰製造、誰驗收？指揮官能阻止假彈藥嗎？"
                  }
            ]
      }
    },
    e_signal_flag: { name: "北洋旗艦信號旗殘件", category: "思想", content: "黃海海戰中，定遠艦（旗艦）桅桿被日艦炮火擊斷，指揮信號旗無法懸掛，各艦失去統一號令，各自為戰。這面破損的信號旗，是北洋水師指揮體系崩潰的縮影——硬體上領先，但一旦指揮中斷，各省各艦便各自逃散。三十年建軍的成果，瞬間化為烏有。洋務建了艦船，卻未建成統一指揮的海軍體制。" },

    // ── Phase 2 新增：分支獎勵 evidence（僅在前面決策選 B 時解鎖） ──
    e_wei_yuan_note: { name: "魏源遺稿殘頁", category: "思想", content: "魏源《海國圖志》初版手稿殘頁，墨跡仍存批註：「夷之長技三：一戰艦，二火器，三養兵練兵之法。為以夷攻夷而作，為以夷款夷而作，為師夷長技以制夷而作。」——魏源，1842年。在八里橋戰場一隅拾得這頁手稿，恍如歷史伏筆：十八年前已有人寫下答案，卻無人聽從。" },
    e_zongli_doc: { name: "總理衙門公文夾", category: "思想", content: "總理衙門 1872 年諭令：**「西方操典譯印分發各營」**。這份公文意味著新式練兵已不是地方獨斷，而是中樞既定之策。地方守舊派若仍守舊式，便是違中樞之命。" },
    e_zhaoshang_ledger: { name: "招商局營收簿冊", category: "求富", content: "招商局光緒四年（1878）營收明細：航運盈餘四十二萬兩、保險業務十八萬兩、棧房租金九萬兩，總計逾七十萬兩，較上年增三成。簿冊末頁附唐廷樞批註：「商辦之效，賬冊自言。若官府不過度干預，五年內可全面取代洋商。」——一本帳冊，是「官督商辦」最有力的辯護。" },
    e_fugue_ce: { name: "丁韙良《富國策》譯本", category: "思想", content: "「國家之強弱，不在器物之精粗，而在制度之良窳。鐵船無千萬之功，憲法有億兆之效。」——丁韙良譯《富國策》（Henry Fawcett 原著），同文館 1880 年印行。丁韙良為美國傳教士、同文館總教習，譯介西方政治經濟學著作。此書的存在本身，已說明清廷部分官員早已知道：自強的真正關鍵不在槍炮，而在制度。然此書傳閱有限，慈禧未及閱卷一頁。" }
  }
};
