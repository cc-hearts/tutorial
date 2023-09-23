## 前言

本文将会讲述如何在 golang 中使用 mysql 并且进行简单的 CRUD

## 安装

安装第三方包

```shell
go get -u github.com/go-sql-driver/mysql
```

## 创建连接

```go
import _ "github.com/go-sql-driver/mysql"

func connection() (*sql.DB, error) {
	db, err := sql.Open("mysql", "root:123456@tcp(localhost:3306)/measure")
	fmt.Println("链接成功")
	return db, err
}
```

可以在 main 中如下使用：

```go
type mysqlInstance struct {
    db *sql.DB
}

func main() {
	db, err := connect()
	if err != nil {
	    panic(err)
	}
	defer db.Close()
	mysqlIns := mysqlInstance{
	    db,
	}
}
```

## 查询数据

```go

func (sql *mysqlInstance) searchUser() (*sql.Rows, error) {
    data, err := sql.db.Query("select id,name from user where id < 10")
    if err != nil {
       fmt.Println(err)
       return nil, err
    }
    return data, nil
}


func main() {

	// ...
	result, err := mysqlIns.searchUser()
	if result == nil {
	    panic("查询错误")
	}

	for result.Next() {
	    var id int
	    var name string
	    // Scan的字段数量要和查询出来的结果数量一直 不然会报错
	    result.Scan(&id, &name)
	    fmt.Println(id, name)
	}
}
```

## 创建数据表

```go
func (sql *mysqlInstance) createNoteBookTable() bool {
    _, err := sql.db.Exec(`CREATE TABLE IF NOT EXISTS notebook (
                                          id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,                                          title varchar(255) NOT NULL) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`)
    if err != nil {
       fmt.Println("create table failed", err)
       return false
    }
    return true
}
```

## 插入信息

```go
func (sql *mysqlInstance) insertData(title *string) bool {
    insertDb, err := sql.db.Prepare(`INSERT INTO notebook(title) VALUES(?)`)
    if err != nil {
       panic(err)
    }
    _, err = insertDb.Exec(*title)
    if err != nil {
       fmt.Println("insert error", err)
       return false
    }
    return true
}
```

## 参考文章

- <https://colobu.com/2019/01/10/drivers-connection-string-in-Go/>
