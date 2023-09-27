const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const Finals2014 = fifaData.filter(
  (mac) => mac.Stage === "Final" && mac.Year === 2014
);
// console.log(Finals2014[0].City);
// console.log(Finals2014[0]["City"]);
console.log(Finals2014[0]["Home Team Name"]);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

console.log(Finals2014[0]["Away Team Name"]);

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

console.log("Home Team Goals", Finals2014[0]["Home Team Goals"]);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

console.log("Away Team Goals", Finals2014[0]["Away Team Goals"]);
//(e) 2014 Dünya kupası finali kazananı*/

if (Finals2014[0]["Away Team Goals"] > Finals2014[0]["Home Team Goals"]) {
  console.log(Finals2014[0]["Away Team Name"]);
} else {
  console.log(Finals2014[0]["Home Team Name"]);
}

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(maclar) {
  const finals = maclar.filter((mac) => mac.Stage === "Final");
  return finals;
}

console.log("Görev 2 Finaller", Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(maclarDizisi, finallerCallback) {
  /* kodlar buraya */
  const finaller = finallerCallback(maclarDizisi);
  console.log("Nabers? finaller", finaller);

  // for of
  // for in
  //   for (let i = 0; i < finaller.length; i++) {
  //     console.log("Nabers? yillar", finaller[i].Year);
  //   }

  // ÇOK ÖNEMLİ SYNTAX FARKI
  //   const yillar = finaller.map((mac) => mac.Year);
  // eğer map'de parantez açarsanız return yazmanıza gerek var
  const yillar = finaller.map((mac) => {
    return mac.Year;
  });

  // anam babam usulü ES5 syntax
  /* 
  function macYil(mac) {
	return mac.Year;
  }
  const yillar = finaller.map(macYil); 
  */

  return yillar;
}

console.log("Görev 3 Yillar", Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(macDizisi, finallerCallback) {
  const finalMaclari = finallerCallback(macDizisi);

  const winners = finalMaclari.map((mac, ind) => {
    if (mac["Away Team Goals"] > mac["Home Team Goals"]) {
      return mac["Away Team Name"];
    } else {
      return mac["Home Team Name"];
    }
  });

  return winners;
}

console.log("Görev 4 Kazananlar", Kazananlar(fifaData, Finaller));

// TODO
/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(dataArr, finalFN, yilFN, kazananFN) {
  /* kodlar buraya */
  const yillar = yilFN(dataArr, finalFN);
  const ulkeler = kazananFN(dataArr, finalFN);
  /* 
ülkeler ve yillarıın indeksleri birbirine eşit
// aynı yılın indeksi ile aynı ülkenin indeksi aynı
[1930,1934,1938,1954,1958,1962,1966,1970,1974,1978,1982,1986,1990,1994,1998,2002,2006,2010,2014]
[Uruguay,Italy,Italy,Germany FR,Brazil,Brazil,England,Brazil,Germany FR,Argentina,Italy,Argentina,Germany FR,Brazil,France,Brazil,Italy,Spain,Germany] */

  /*  for (let i = 0; i < 19; i++) {
    return `${yillar[i]} yılında, ${ulkeler[i]} dünya kupasını kazandı!`;
  } 
  */

  /* 
  function yilVeUlke(yil, i) {
    return `${yil} yılında, ${ulkeler[i]} dünya kupasını kazandı!`;
  }
  return yillar.map(yilVeUlke); 
  */

  return yillar.map((yil, i) => {
    return `${yil} yılında, ${ulkeler[i]} dünya kupasını kazandı!`;
  });
}

console.log(
  "Görev 5",
  YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar)
);

// TODO
/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/
// TODO
function OrtalamaGolSayisi(finalArray) {
  let toplamGol = 0;
  /*  for (let i = 0; i < finalArray.length; i++) {
    toplamGol +=
      finalArray[i]["Home Team Goals"] + finalArray[i]["Away Team Goals"];
  }
   */

  finalArray.forEach((mac) => {
    toplamGol += mac["Home Team Goals"] + mac["Away Team Goals"];
  });

  return (toplamGol / finalArray.length).toFixed(2);
}

console.log("Görev 6", OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
  /* kodlar buraya */
}

console.log("BONUS 1", UlkelerinKazanmaSayilari(fifaData, "BRA"));

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */
// XXX
function EnCokGolAtan(/* kodlar buraya */) {
  /* kodlar buraya */
}

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/
// XXX
function EnKotuDefans(/* kodlar buraya */) {
  /* kodlar buraya */
}

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
