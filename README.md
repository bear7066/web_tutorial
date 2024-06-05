### 資料庫串接及操作資料庫

**1. /routes**

在 Web 開發中，Route 大概是一個操作集合，用來管理 client 傳送過去 server 的請求，這些請求包括：
- GET: 取得目前 server 裡有的東西
- DELETE: 顧名思義
- POST: 新增

在這個 repo 裡， server 指的是 mongodatabase，之後可以把它替換成任何服務

**2. /models**
這裡大概是放資料結構，分開寫、一起寫都可以，schema 其實就是用來代表資料結構的術語

**3. 啟動步驟**

a. 安裝好套件

``` npm install ```

b. 啟動 mongodb 於 3000 port

``` node index.js ```

啟動 mongodb 的程式都寫在這裡了

c. 測試

建立購物車
```
curl -X POST http://localhost:3000/user/cart/
```

刪除購物車
```
curl -X DELETE http://localhost:3000/user/cart/{cart_id}
```

添加商品
```
curl -X POST -H "Content-Type: application/json" -d '{"product": "item1"}' http://localhost:3000/user/cart/{cart_id}/add
```

移除特定商品
```
curl -X DELETE -H "Content-Type: application/json" -d '{"product": "item1"}' http://localhost:3000/user/cart/{cart_id}/remove
```

列出所有購物車及內容
```
curl -X GET http://localhost:3000/user/cart/list
```

列出指定購物車的內容
```
curl -X GET http://localhost:3000/user/cart/{cart_id}/list-cart
```
