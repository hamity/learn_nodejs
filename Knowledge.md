# Nodejs

## Webサーバーを作る

```
const http = require('http');

var server = http.createServer(
    (request, response)=>{
        response.end('Hello Node.js');
    }
);
server.listen(3000);
```
でサーバーを立てることができる。

### コードを読んでいく

#### httpモジュールとrequire()

```
const http = require('http');
```
- requireメソッド

httpモジュールをロードする。<br>Nodejsの多数の用意されたオブジェクトはモジュール化(部品化)されており、これをモジュールローディングシステムでロードを行い利用できるようにしている。

- httpモジュール

HTTPのアクセスに必要な機能を提供するもの。HTTPプロトコルでHTTPアクセスする機能とかがまとまってる。

```
var server = http.createServer(
		//引数として関数定義ができる
);
```

#### createServer()

- createServer()

<a href="https://gyazo.com/f9c96645950b8f7b5ce80e646f9867b2"><img src="https://i.gyazo.com/f9c96645950b8f7b5ce80e646f9867b2.png" alt="https://gyazo.com/f9c96645950b8f7b5ce80e646f9867b2" width="675"/></a><br>

サーバーオブジェクト(正確にはhttp.Serverオブジェクト)を作成し返す.<br>
このオブジェクトを操作することで、サーバープログラムを操作することになる。<br>
http.Serverオブジェクトは必要な設定を行なったあと、サーバーとして実行させる。[(詳しく話)](https://www.nodebeginner.org/index-jp.html)

引数としてrequestListnerオブジェクトを代入できる。



#### requestListnerオブジェクト

- リクエストリスナーとは?

リクエストを処理する関数。
リクエストとレスポンスを処理するために、2つのパラメータが渡される。<br>
レスポンスオブジェクトには、レスポンス関連のメソッドやオブジェクトがある。
<a href="https://gyazo.com/ec15e2e35d36acadc29ccde19398e836"><img src="https://i.gyazo.com/ec15e2e35d36acadc29ccde19398e836.png" alt="https://gyazo.com/ec15e2e35d36acadc29ccde19398e836" width="561"/></a><br>
[参考にした表がのった記事](https://www.h-fj.com/blog/archives/2013/03/28-143437.php)

誰かがhttpServerのサーバーにアクセスすると、createServerの引数で指定したリクエストリスナーが呼び出される。そしてその結果がクライアントに返る。<br>
つまり、誰かがサーバーにアクセスすると必ず実行される処理がここに書かれる。


- () => {}っていう書き方

今回のコードでは
```
(request, response)=>{
        response.end('Hello Node.js');
}
```

と書かれている。これは

```
function(request, response){
	response.end('Hello Node.js');
}
```

- response.end()
	- response<br>
	  サーバーからクライアントへの返信に関するオブジェクト
	- end([text])<br>
	  引数textは省略可. クライアントへの返信を終了するメソッド.引数がある場合はそれを出力(callbackが引数にある場合はそれを実行)して返信を終える[(リファレンス)](https://nodejs.org/api/http.html#http_response_end_data_encoding_callback)
	
#### 引数のrequestとresponseについて

この２つの引数には下のようなオブジェクトが収まっている

|変数|代入されたオブジェクト|説明|
|---|---|---|
|request|http.ClientRequest|クライアントから送られた情報を管理したりする|
|response|http.ServerResponse|サーバーから送る情報を管理したりする|

この２つをもとに、responseについての処理ははhttp.serverResponseでできるはずとか見当をつけると良い

#### listen()

```
server.lisetn(3000);
```

createServerメソッドで作成したhttp.Serverオブジェクトを待受状態にする。<br>
引数に待受けるポート番号を指定する(今回は3000番ポート)。<br>
この番号を8888にすれば8888番ポートで表示できる。

- 待受状態

サーバーは誰かがアクセスしたら処理するものなので、誰かアクセスしてこないを待っている状態にしておくこと。

## HTMLを出力する

request.end()の引数にはHTMLコードを書くことができる。<br>
しかし、それだけではうまく表示されないことがある。<br>

### うまく表示されない理由

WebはHTMLコードを受け取ると表示される……訳ではない。<br>
webブラウザは受け取ったデータがHTMLデータなのか?JSONデータなのかがわからない。<br>
受け取ったデータはHTMLですよと教えてあげないとうまくデータを扱えない。

このようなweb表示の設定に関する情報とかのことを**ヘッダー情報**という。<br>

例) 文字コードはutf-8, コンテンツはHTML etc..

クライアントにデータを送る際に、ヘッダー情報を一緒に送れば、クライアントは正しく処理してくれる。

### ヘッダーの設定をする


２つ方法がある

1.  HTMLのhead内に書く
2. http.serverResposeのメソッドを使用する

以下の３つのメソッドが用意されている

```
//ヘッダーの情報を設定する
response.setHeader(name, value);
```

```
//ヘッダーの情報を得る
var hoge = response.getHeader(value);
```

```
//ヘッダーの情報を出力する
reseponse.writeHead(コード番号, メッセージ);
```

## HTMLで日本語表示する

```
const http = require('http');

var server = http.createServer(
    (hogehoge, response)=>{
        response.setHeader('Content-Type', 'text/html');
        response.write('<!DCTYPE html><html lang="jp">');
        response.write('<head><meta charset="utf-8">');
        response.write('<title>Hello</title></head>');
        response.write('<body><h1>Hello Node.js</h1>');
        response.write('<p>サンプル</p>', 'utf-8');
        response.write('</body></html>');
        response.end();
    }
);
server.listen(3000);
console.log('Server Start!');
```

まず、
```
response.setHeader('Content-Type', 'text/html');
```
では、Content-Typeをtext/htmlに設定している

- Content-Type

コンテンツの種類を示す

- text/html

テキストデータでHTML形式のもの

```
response.write('<body><h1>Hello Node.js</h1>');
```
endメソッド内にHTMLの長い文を書くと見栄えが悪くなるため、短く区切ったテキストを書き出していく。<br>
それに使用するメソッドがwriteである。

```
console.log('Server Start!');
```

コンソール画面にメッセージを出力するもの。
<a href="https://gyazo.com/bf7e39f14deac06de8347ae06db9009d"><img src="https://i.gyazo.com/bf7e39f14deac06de8347ae06db9009d.png" alt="https://gyazo.com/bf7e39f14deac06de8347ae06db9009d" width="420"/></a>

また、console.log()でメッセージを表示することで、エラーの箇所を把握するのに役立てることができる。

## HTMLファイルを使う

HTMLのコードが膨大になっても、writeメソッドを使うのは得策ではない。

ファイルを扱うためのオブジェクトが用意されているので、それを使用してHTMLファイルを読み込む。

### ファイルを扱うためのオブジェクト

ファイルを扱うためのオブジェクトは**「File System」**オブジェクトと呼ばれ、**fs**という名前でNode.jsに用意されている。<br>
利用するには、requireメソッドを用いて

```
fs = require('fs');
```

とすれば良い。

#### Fileをロードする
```
fs.readFile(fileName, encoding, func);
```

- fileName

読み込むファイルの名前

- encoding

ファイルのエンコード形式 (ex. 'UTF-8'など)

- func

ファイルの読み込みが終わった後に実行する処理

**注意**<br>
readFileは読み込んですぐに処理が終わるものではないため、読み込み作業は*バックグラウンド*で行われる。<br>
読み込みの処理終了後に処理したいことは必ずfuncに書く必要がある。

つまり、下のようなコードがあって、readFileで読み込むのに時間がかかる場合コメントのような順番に処理が行われることがあるかもしれないということである。

```
fs.readFIle(fileName, encoding, func /* ④ */);     //①
func1()  //②
func2()  //③
```

### readFileのコールバック関数

Nodejsでは(時間がかかるかもしれない)**処理が終わったら後で呼び出すメソッド**というのがよく使われ、このような関数のことを**コールバック関数**という。<br>
readFileメソッドのコールバック関数は、次のように定義されている。

```
(error, data)=>{ //実行する内容 }
```

- error

読み込みエラーが起きた時にエラーの情報が入ったオブジェクトが渡される。エラーがない場合は空

- data

ファイルから読み込んだデータ。これをrespose.write()で書き出せば良い

以下はreadFile内のコールバック関数の一例

```
(error, data) =>
{
	response.writeHead(200, {'Content-Type' : 'text/html'});
	response.write(data);
	response.end();
}
```

writeHead内のContent-Typeについては[Content-Typeの一覧](https://qiita.com/AkihiroTakamura/items/b93fbe511465f52bffaa)を参考

### 関数の切り分け時の注意

```
const http = require('http');
const fs = require('fs');

var server = http.createServer(createServerCallBack);  //コールバック関数の名前だけでok
server.listen(3000);
console.log('Server Start!');

function createServerCallBack(req, res){
    request = req;
    respose = res;
    fs.readFile('./index.html', 'UTF-8', (error, data) =>{
    	//処理
    }
}
```
と切り分けられた。ではreadFile()も関数にして切り分けしようとすると

```
function createServerCallBack(req, res){
	request = req;
	response = res;
	fs.readFile('./index.html', 'UTF-8', readFileCallBack);
}

function readFileCallBack(error, data){
	response.write(data);
	//処理
}
```
だけでは動かない。というのも、readFileCallBack()内のresponse変数がなんだかわからずエラーとなるからである。<br>
ゆえに、プログラムの上の方で;

```
var request;
var reponse;
```

を追加しなければならない。

## 非同期処理とは?

### 普通のプログラミング

命令を実行し、それが終わったら次の命令に進む。このような処理の方法を**同期処理**という

```
func1();
//処理が完了次第func2()を実行
func2();
//処理が完了次第func3()を実行
func3();
```

### Nodejsのプログラミング

readFileを例にとると、処理が終わってないのに次の処理へ進んでしまう。このような処理の仕方を**非同期処理**と呼ぶ。

```
func1();
//処理が完了してなくてもfunc2()を実行
func2();
//処理が完了してなくてもfunc3()を実行
func3();
```

非同期処理を使うと、やるべきところはさっさと終わらせ、時間がかかる処理はその後でゆっくり進めれば良い状態となる。<br>
その際、処理が終わったらどうするのかが問題になる。このためにあるのが**コールバック関数**である。

## テキストを操作する

HTMLの表示をプログラムで制御したいこともある。そんな時は、

1. HTMLのテキストを変数に読み込み
2. テキストの探索&置換で別の文字へ変える

ことをすれば良い。実はそんな機能がJavaScriptにはある。

### replaceメソッド

次のようにテキストの置換が行える

```
var text.replace(searchableText, replacementText);
```

- text

置換したいテキスト

- searchableText

検索テキスト。この文字に該当する箇所をreplacementTextに置き換える(正規表現)

- replacementText

searchableTextに合致する箇所をreplacementTextに置換する

### 使用例

```
<!-- index.html(html部分は省略) -->
<body>
	<h1>variable_title</h1>
	<p>variable_content</p>
</body>
```

readFileメソッドのコールバック関数

```
var content = data.
	replace(/variable_title/g, 'タイトル').
	replace(/variable_content/g, 'コンテンツです');
	
	//略
```

### /gとは何か?

正規表現でグローバルマッチと呼ばれる、文字列の最後まで探索を繰り返すマッチング方法のこと。<br>
見つかった**全て**の部分文字列が置換される。

```
var text = "aabbaa".replace(/aa/, "cc");
console.log(text);	//ccbbaa
```

```
var text = "aabbaa".replace(/aa/g, "cc");
console.log(text);	//ccbbcc
```

## テンプレートエンジンを使う

先ほどの正規表現を用いた変換はうまい方法とは言えない。<br>
というのも、余計な部分まで変換してしまう可能性があるからだ。<br>

こんな時、テンプレートエンジンを使用するとうまくコンテンツを操作できる。

### テンプレートエンジンとは?

独自の記述方法に沿って表示するテキスト等を用意する仕組み。<br>
多くのテンプレートでは変数や値を記述する仕組みがある。<br>
テンプレートの中に書いておくことで、読み込んだ後にテンプレートエンジンで変数が代入されたものがHTMLに変換、出力される。

## EJSを使う

EJS(Embedded JavaScript Templete)とはJSでよく利用されているテンプレートエンジン。

Node.jsには標準装備されていない。

「パッケージマネージャー」を利用してインストールする。

### パッケージマネージャーとは

色々なプログラム（パッケージ）を管理するためのツール。

パッケージが肥大化していき、git等で共有するのは適切ではないと考え、パッケージは.gitignoreに入れる代わりにnpmを用いて誰でも同じ環境を用意できるようにした。

### パッケージのインストール

```
npm install -g packageName
```

- packageName パッケージ名

これだけでNode.jsに必要なモジュールをインストールできる。

#### -gって何か?

-g をつけるとグローバル領域(Node.js本体)にインストール(Node.js本体の拡張が)される(グローバルインストール)。

-gオプションを指定した場合、Mac OS X環境では/usr/local/lib/node_modulesにライブラリがインストールされます。同時に同ディレクトリにパスが通るようになり、どのアプリケーションでもコマンドが呼び出せるようになります。

-gオプションを指定しない場合はローカルインストールと呼ばれ、カレントディレクトリ配下にnode_modulesというディレクトリが作成され、その配下にライブラリがインストールされるようになります。

[(参考:npm installコマンドの-gオプションについて)](http://d.hatena.ne.jp/replication/20110607/1307458180)

ただし、<br>
グローバルに入れてしまうとpackage.jsonにインストールしたパッケージの情報が記載されず、他の人にpackage.json渡して、npm install　してもらっても開発環境が出来ない<br>
ので注意。

[(参考:npm install でグローバルに入れるかローカルに入れるか問題)](http://yuto-m.hatenablog.com/entry/2017/08/05/222248)

ちなみにグローバルインストールでもpackage.jsonに書き出すコマンドはある [(参照:【Node.js】【npm】 npm コマンド超基本)](http://takafumi-s.hatenablog.com/entry/2015/11/11/003509)

##### HTMLのstyleタグ

```<head></head>```の中にある```<style></style>```とは何か？

```<style>```タグはスタイルシートを記述するためのタグ。

スタイルシートを利用するには

1. linkタグで外部のスタイルシートを読み込む方法
2. styleタグを使用してスタイルシートを記述する方法

の２つある。　styleタグを使用する場合はスタイルシート全体を```<!-- -->```でコメントにする。<br>
これは、スタイルシートに対応していないブラウザで、 スタイルシートがそのままテキストとして表示されることを避けるため。[(参考: HTMLクイックリファレンス)](http://www.htmq.com/html/style.shtml)

#### テンプレートエンジンを使用する流れ

1. テンプレートファイルを読み込む(.ejsの拡張子がついたファイル)
2. レンダリング(テンプレートを元にHTMLのソースコードを生成)する
3. 生成された表示内容を出力する

#### EJSオブジェクトについて

```
const ejs = require('ejs');
```

これは言わずをもがな。

```
fs.readFileSync（'index.ejs', 'utf8'）;
```

テンプレートファイルであるindex.ejsを**同期処理**で読み込む。<br>
読み込みに時間がかかってしまうのでは？と思いがちだが、サーバーが起動する前なので大丈夫。サーバが起動するのに時間がかかるだけ。

サーバーが動き出した後(createServerメソッドのコールバック関数で)に時間のかかる処理を行ってしまうと処理が停滞していく原因になるので使用しないようにする。

今回(p98)はテンプレートエンジンをサーバー起動前に読み込んでいるが、これはアクセスした人全員が使用するため。<br>
そのためあらかじめファイルを全て読み込んでおき、その変数を使って処理をしている。

```
response.writeHead(200, {'Content-Type': 'text/html'});
```
第１引数はステータスコード<br>
ページが見つからない場合は404, リクエストの成功時には200を返す。[(参考: HTTPステータスコード)](https://ja.wikipedia.org/wiki/HTTP%E3%82%B9%E3%83%86%E3%83%BC%E3%82%BF%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%89)

第２引数はレスポンスヘッダを含むオブジェクト<br>

レスポンスヘッダ: レスポンスに付与されるメタ情報（データの補足情報）のこと<br>
Content-type: クライアントに対して、どのようなデータを送るのかを指定する。<br>
クライアントは受け取ったデータのコンテンツタイプを見て、どのようにデータを処理するかを決める<br>
今回はtext/htmlから、HTMLファイルのデータが送られたことをクライアントは理解できる。<br>
[(参考: コンテンツタイプの設定(setContentType)](https://www.javadrive.jp/servlet/response/index2.html)

[(writeHead()の参考page: What is the use of response.writeHead() in Node.js?)](https://www.quora.com/What-is-the-use-of-response-writeHead-in-Node-js)

- レンダリングの実行

```
var content = ejs.render(index_page);
```

読み込まれたejsデータの入ったindex_pageオブジェクトをrenderメソッドを用いてレンダリングし、実際に表示するHTMLコードに変換する。これにより表示するHTMLコードはできたため、あとはwriteで出力すれば表示ができる

#### まとめ

1. テンプレートファイルを読み込む(.ejsの拡張子がついたファイル)

```
const index_page = fs.readFileSync(./index.ejs', 'utf8');
```

2. レンダリング(テンプレートを元にHTMLのソースコードを生成)する

```
var content = ejs.render(index_page);
```

3. 生成された表示内容を出力する

```
response.write(content);
```

となる

### プログラミング側の値の表示

HTMLで表示する値をプログラミング側で決められるようにしよう。

ejsでは```<%=hoge %>```といったように、```<%= %>```を用いてHTMLに値を埋め込む変数を用意することができる。<br>
下のように

```
<body>
    <head>
        <h1><%=title %></h1>
    </head>
    <div class="main">
        <p><%=content　％></p>
    </div>
</body>
```

書くことができる(head属性の中にも変数を用意することができる)。しかし、(当たり前だが)プログラム側で代入する値を決めなければならない。<br>
それは、次のようにrenderメソッドを修正することで行うことができる

```
var content = ejs.render(index_page, {
      title:"タイトル",
      content:"内容",  
    });
```

これにより、title変数には「タイトル」が、content変数には「内容」という文字が入ったHTMLが生成（レンダリング）される。

## Stylesheetを適用する

style.cssを作成し、その中にスタイル情報を書き、さらにindex.ejsに

```
    <link rel="stylesheet" href="./style.css" type="text/css">
```

を追加した。(style属性の部分は消しておく）

試しにlocalhost:3000/style.cssにアクセスしてみる。

<a href="https://gyazo.com/e55fcce33d5c179586e0de9a5cf6a241"><img src="https://i.gyazo.com/e55fcce33d5c179586e0de9a5cf6a241.png" alt="https://gyazo.com/e55fcce33d5c179586e0de9a5cf6a241" width="374"/></a>

しかし、index.ejsの表示しかされない。

実は、localhost:3000の後ろに何をつけてもlocalhost:3000/index.ejsが表示されるようになっている。

というのも、app.js内ではindex.ejsのファイルを読み込み、writeメソッドで表示を行なっていたため。<br>
全てのURIに対してindex.ejsが表示されていた。<br>

そのため、URIによって表示する内容を変えるにはルーティングという処理を書く必要がある。

## ルーティングの処理

### URLオブジェクト

URLの決定や構文解析のために、URLオブジェクトというものが用意されている。[参考: URI](https://nodejs.org/api/url.html#url_url)

```js
const url = require('url')
```

でモジュールの読み込みができる。

url.parseメソッドでURLデータをパース（解剖）し、返り値としてパースした値が代入されたオブジェクトが返される。<br>
[返されるオブジェクトについての参照: Node.jsでURLをパースする](http://info-i.net/url-parse)

```js
const url_parts = url.parse(request.rul)
```

あとはurl_partsの値によってswitch文で表示を切り替えれば良い

## 他のページへの移動

```html
    <p><a href="/other">Other Pageに移動</a></p>
```
a属性のhrefタグの指定はURIのパスネームの部分を入力すればよい。<br>
このリンクがクリックされるとapp.jsでhrefタグに書かれたURLがルーティング処理される

## 2章まとめ

- Nodejsの基本は "httpの用意", "サーバーの用意", "待ち受け"
	- httpの用意: require()
	- サーバーの用意: http.createServer
	- 待ち受け: 用意したサーバーのオブジェクトをserverとするとserver.listen(ポート番号)

- EJSの使い方
	- fs.readFileSync()でEJSファイルを読み込み
	- .ejsファイルをレンダリングすることでHTMLのソースに変換(ejs.render())
	- そしてレンダリング後のソースを表示(response.write())
	- .ejsファイルで変数を用意する(<%= hoge %>)
		- レンダリング時に変数に代入したい値を指定する
- ルーティング
	- urlモジュールを使う
	- pathnameが知りたい場合はurl.pathname
		- その後パースしてあげることでパスを取得
	- どのサイトを表示するか指定することが当たり前だが重要