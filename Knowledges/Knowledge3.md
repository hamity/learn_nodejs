# 3章

## GETで値を送る

urlの後ろの'?p=1&hoge=32&fuga=foo' のようなものを**クエリーパラメーター**と呼ぶ

https://www.google.co.jp/search?q=dog

の場合、`q=dog`の部分がクエリーパラメーター.

クエリーパラメーターで必要な値をサーバーに渡せる

```js
const url_parts = url.parse(request.url, true)  //第２引数としてtrueを追加
    case '/':
      let message = "これはIndexページです。"
      const query = url_parts.query
      if(query.msg != undefined){       //msgというクエリパラメーターが存在しないとき、nullではなくundefinedが返ってくる
        const query_obj = 
        message += "あなたは、「" + query.msg + "」と送りました"
      }
      const content = ejs.render(index_page, {
        title: "Index",
        content: message,
```

- url.parseの第２引数

trueにすると、クエリパラメーターもパース処理が行われる。
ここでいうパース処理というのはURLを字句解析するということだと思う。

|parseの第２引数|url_parts.queryの結果|'?hoge=2&foo=bar'の時の結果|
|---|---|---|
|指定しない or false|?より後ろのクエリーパラメーターが代入される|hoge=2&foo=bar
|true|クエリーパラメーターがオブジェクトとして代入される|{hoge: 2, foo: 'bar'}|

- url_parts.query

```
先頭のASCII疑問符（?）が付いていないクエリ文字列、またはquerystringモジュールのparse()メソッドによって返されたオブジェクトのいずれかが返り値となる。queryプロパティが文字列かオブジェクトかは、parseQueryString(url.parseメソッドの第２引数のこと)に渡された引数によって決まります。

返り値の例：'query=string'または{'query': 'string'}
```
[公式ドキュメント: urlObject.query](https://nodejs.org/api/url.html#url_urlobject_query)

リファレンスにまんま書いてある。url.parseメソッドで返されるオブジェクトには<br>
どんな値が代入されているのかを確認したい場合は、以下のサイトを参考

http://yohshiy.blog.fc2.com/blog-entry-316.html


- if文の中

```
        const query_obj = 
        message += "あなたは、「" + query.msg + "」と送りました"
```

正直query_objが何をしたいのかがわからない。使わないのになんで書いてあったんだろ。謎。

- 結果

http://localhost:3000/?msg=Hello&hoge=foo
にアクセスすると、<br>
サイトのテキストとして`これはIndexページです。あなたは「Hello」と送りました`と表示される。

http://localhost:3000/?hoge=foo
にアクセスすると、<br>
クエリパラメーターの値としてmsgはないので、`これはIndexページです。`のみ表示される。