---
title: File 文件流
categories: Java
---

## 基本文件流的使用

### 字符流：

```java
package file;

import org.junit.Test;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;

/**
 * 基本文件流操作
 */
public class BaseFile {
    public static void main(String[] args) {
        BaseFile baseFile = new BaseFile();
        baseFile.readFile();
    }

    /**
     * file 基本使用
     */
    public void baseFile() {
        File file = new File("hello.txt");
        System.out.println(file.getAbsoluteFile());
        // /Users/heart/Desktop/java/stu/hello.txt 相较于当前工程
    }

    /**
     * 文件数据读取
     */
    public void readFile() {
        FileReader fr = null;
        try {
            fr = new FileReader("src/file/base-file.txt");
            while (true) {
                int a = fr.read();
                if (a == -1) break;
                // 表现形式为 uft8 可以使用char转为字符串
                // 换行符的 操作为 10
                System.out.println(a);
            }

        } catch (Error | IOException e) {
            // 文件如果不存在 则会报错 FileNotFoundException
            e.printStackTrace();
        } finally {
            try {
                // 关闭流的读取操作
                // JVM无法对自动对I/O流进行关闭 因此 需要我们自己去关闭 否则会造成内存泄漏
                // 保证流的能够正常的关闭
                if (fr != null) {
                    fr.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


    @Test
    public void test() {
        File file = new File("hello.txt");
        System.out.println(file.getAbsoluteFile());
        // 相较于当前的Module
        // /Users/heart/Desktop/java/stu/hello.txt
    }

}

```

> char[] 读取文件

```java
@Test
public void test(){
	char[]cr=new char[5];
	FileReader fr=null;
	try{
		fr=new FileReader("src/file/base-file.txt");
		int len=0;
		// 实例化一个 FileReader类 设置默认的文件路径 如果read(char[] cbuf)传递了一个char类型的参数 则会将变量读取到参数中
		while((len=fr.read(cr))!=-1){
			for (int i=0;i<cr.length;i++){
				System.out.print(cr[i]);
			}
			System.out.println();
		}
	}
	catch(Error|FileNotFoundException e){
		e.printStackTrace();
	}
	catch(IOException e){
		throw new RuntimeException(e);
	}
	finally{
		try{
			if(fr!=null){
				fr.close();
			}
		}
		catch(IOException e){
			e.printStackTrace();
		}
	}
}
```

```java
@Test
public void readTest(){
	FileReader fr=null;
	try{
		File file=new File("src/file/base-file.txt");
		char[]cr=new char[5];
		System.out.println(file.getAbsoluteFile());
		fr=new FileReader(file);
		int len=0;
		while((len=fr.read())!=-1){
			System.out.print((char)len);
		}
	}
	catch(Error|IOException e){
		e.printStackTrace();
	}
	finally{
		try{
			if(fr!=null){
				fr.close();
			}
		}
		catch(IOException e){
			e.printStackTrace();
		}
	}
}
```

> 文件写入类
> 文件可以不存在
> 如果文件不存在 则会创建文件 在写入内容
> 如果文件存在：

```java
@Test
public void readTest(){
	FileReader fr=null;
	try{
		File file=new File("src/file/base-file.txt");
		char[]cr=new char[5];
		System.out.println(file.getAbsoluteFile());
		fr=new FileReader(file);
		int len=0;
		while((len=fr.read())!=-1){
			System.out.print((char)len);
		}
	}
	catch(Error|IOException e){
		e.printStackTrace();
	}
	finally{
		try{
			if(fr!=null){
				fr.close();
			}
		}
		catch(IOException e){
			e.printStackTrace();
		}
	}
}
```

```java
/**
 * 将 hello.txt  文件拷贝到 hello.txt 中
 */
@Test
public void copyFile(){
	FileReader fr=null;
	FileWriter fw=null;
	try{
		fr=new FileReader("src/file/hello.txt");
		fw=new FileWriter("src/file/hello1.txt");
		int len=0;
		while((len=fr.read())!=-1){
			fw.write((char)len);
		}
		// 强制将缓存中的数据写入流中 调用fw.close() 也会调用这个方法
		// fw.flush();
	}
	catch(Error|FileNotFoundException e){
		e.printStackTrace();
	}
	catch(IOException e){
		throw new RuntimeException(e);
	}
	finally{
		try{
			if(fr!=null)fr.close();
			if(fw!=null)fw.close();
		}
		catch(IOException e){
			e.printStackTrace();
		}
	}
}
```

### 字节流

```java
/**
 * 使用字节流去拷贝图片
 */
@Test
public void copyImage(){
	FileInputStream fr=null;
	FileOutputStream fw=null;
	try{
		// 读取操作
		fr=new FileInputStream("src/file/image.png");
		// 写入操作
		fw=new FileOutputStream("src/file/image1.png");
		int len=0;
		// read -1 ~ 255 字节流
		while((len=fr.read())!=-1){
			System.out.println(len);
			fw.write(len);
		}
	}
	catch(FileNotFoundException|Error e){
		e.printStackTrace();
	}
	catch(IOException e){
		throw new RuntimeException(e);
	}
	finally{
		try{
			if(fr!=null)fr.close();
			if(fw!=null)fw.close();
		}
		catch(IOException e){
			e.printStackTrace();
		}
	}
}
```

字节流 如果读取字符的话 英文和数字不会乱码 中文可能会乱码

> 1 个中文占用 3 个字节
> .jpg .mp3 .mp4 .avi .doc .ppt 等都可以使用字节流处理

### 缓冲流

- BufferedInputStream
- BufferedOutputStream
- BufferedWriter
- BufferedReader

> 关闭外层的流 也会将内层的流一起关闭

```java
/**
 * 缓冲流
 * 字符流处理
 */
@Test
public void bufferFileClass()throws FileNotFoundException{
	BufferedReader reader=null;
	BufferedWriter writer=null;
	try{
		File originFile=new File("src/file/hello.txt");
		FileReader fileReader=new FileReader(originFile);
		reader=new BufferedReader(fileReader);
		File remoteFile=new File("src/file/hello1.txt");
		FileWriter fileWriter=new FileWriter(remoteFile);
		writer=new BufferedWriter(fileWriter);
		int len=0;
		while((len=reader.read())!=-1){
			writer.write(len);
		}
	}
	catch(Error|FileNotFoundException e){
		e.printStackTrace();
	}
	catch(IOException e){
		throw new RuntimeException(e);
	}
	finally{
		try{
			if(reader!=null)reader.close();
			if(writer!=null)writer.close();
		}
		catch(IOException e){
			throw new RuntimeException(e);
		}
	}
}
```

```java
/**
 * 缓冲流
 * 字节流
 */
@Test
public void bufferFileClass()throws FileNotFoundException{
	BufferedReader reader=null;
	BufferedWriter writer=null;
	try{
		File originFile=new File("src/file/hello.txt");
		FileReader fileReader=new FileReader(originFile);
		reader=new BufferedReader(fileReader);
		File remoteFile=new File("src/file/hello1.txt");
		FileWriter fileWriter=new FileWriter(remoteFile);
		writer=new BufferedWriter(fileWriter);
		int len=0;
		while((len=reader.read())!=-1){
			writer.write(len);
		}
	}
	catch(Error|FileNotFoundException e){
		e.printStackTrace();
	}
	catch(IOException e){
		throw new RuntimeException(e);
	}
	finally{
		try{
			if(reader!=null)reader.close();
			if(writer!=null)writer.close();
		}
		catch(IOException e){
			throw new RuntimeException(e);
		}
	}
}
```

BufferedInputStream 内部提供了缓冲区

```java
private static int DEFAULT_BUFFER_SIZE=8192; // 提供了8kb的缓冲区
```

手动调用 flush 将缓冲区的内容写入到文件中（并且清空缓冲区）

```java
FileWriter fw=null;
File file=new File("src/file/hello.txt");
// 不再原有的文件进行添加 false 则覆盖原来的文件 true 则咋原来的文件下追加
fw=new FileWriter(file,true);
fw.write("hello read");
// 将缓存流写入到文件中
fw.flush();
```

`readLine` 每次读取一行的数据

```java
File originFile=new File("src/file/hello.txt");
FileReader fileReader=new FileReader(originFile);
reader=new BufferedReader(fileReader);

File remoteFile=new File("src/file/hello1.txt");
FileWriter fileWriter=new FileWriter(remoteFile);
writer=new BufferedWriter(fileWriter);

String str="";
while((str=reader.readLine())!=null){
	// str中不会包括换行符
	writer.writer(str);
	// 可以使用newLine()换行
	writer.newLine();

}
```

### 图片加解密

```java
@Test
    public void secretTest() {
	BufferedInputStream bis = null;
	BufferedOutputStream bos = null;
	try {
		bis = new BufferedInputStream(new FileInputStream("src/file/image.png"));
		bos = new BufferedOutputStream(new FileOutputStream("src/file/image-secret.png"));
		int len = 0;
		while ((len = bis.read()) != -1) {
			// 加密操作
			bos.write(len ^ 5);
		}
	}
	catch (Error | IOException e) {
		e.printStackTrace();
	}
	finally {
		try {
			if (bis != null) bis.close();
			if (bos != null) bos.close();
		}
		catch (IOException e) {
			e.printStackTrace();
		}
	}
}
```

解密：

```java
@Test
    public void decode() {
	BufferedInputStream bis = null;
	BufferedOutputStream bos = null;
	try {
		bis = new BufferedInputStream(new FileInputStream("src/file/image-secret.png"));
		bos = new BufferedOutputStream(new FileOutputStream("src/file/image-decode.png"));
		int len = 0;
		while ((len = bis.read()) != -1) {
			// 解密操作
			bos.write(len ^ 5);
		}
	}
	catch (Error | IOException e) {
		e.printStackTrace();
	}
	finally {
		try {
			if (bis != null) bis.close();
			if (bos != null) bos.close();
		}
		catch (IOException e) {
			e.printStackTrace();
		}
	}
}
```

### 转换流

- 输入转换流: InputStreamReader 字符输入流
- 输出转换流: OutputStramWriter 字符输出流

```java
/**
 * InputStreamReader 输入转换流 将一个字节的输入流转换为字符的输入流
 * OutputStreamWriter 输出转换流
 */
@Test
public void InputStreamReaderTest() {
    InputStreamReader isr = null;
    OutputStreamWriter ior = null;
    try {
        FileInputStream fis = new FileInputStream("src/file/base-file.txt");
        FileOutputStream fos = new FileOutputStream("src/file/base1-file.txt");
        // 第二个参数代表使用什么编码方式去读取流  可以指定过得方式有 'UTF-8' 'GBK'        isr = new InputStreamReader(fis, StandardCharsets.UTF_8);
        // 以gbk的编码形式写入
        ior = new OutputStreamWriter(fos, "GBK");
        int len = 0;
        while ((len = isr.read()) != -1) {
            ior.write(len);
        }
    } catch (Error | FileNotFoundException e) {
        e.printStackTrace();
    } catch (IOException e) {
        throw new RuntimeException(e);
    } finally {
        try {
            if (isr != null) isr.close();
            if (ior != null) ior.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

- ASCII 英国标准信息交换码
- ISO08859-1 拉丁码表
- GB2312 中国的中文编码表
- GBK (ANSI) 中文编码表的升级
- Unicode
- UTF-8

> Unicode 不完美，这里就有三个问题，一个是，我们已经知道，英文字母只用
> 一个字节表示就够了，第二个问题是如何才能区别 Unicode 和 ASCII？计算机
> 怎么知道两个字节表示一个符号，而不是分别表示两个符号呢？第三个，如果
> 和 GBK 等双字节编码方式一样，用最高位是 1 或 0 表示两个字节和一个字节，
> 就少了很多值无法用于表示字符，不够表示所有字符。Unicode 在很长一段时
> 间内无法推广，直到互联网的出现。
> 面向传输的众多 UTF(UCS Transfer Format)标准出现了，顾名思义，UTF
> 8 就是每次 8 个位传输数据，而 UTF-16 就是每次 16 个位。这是为传输而设计的
> 编码，并使编码无国界，这样就可以显示全世界上所有文化的字符了。
> Unicode 只是定义了一个庞大的、全球通用的字符集，并为每个字符规定了唯
> 确定的编号，具体存情减什么样的字节流，取决于字符编码方案。推荐的
> Unicode 编码是 UTF-8 和 UTF-16。

**Unicode 符号范围 IUTF-8 编码方式**
(十六进制) | (二进制)

> 0 表示只有 1 个字符存储

    00000000-0000007F | 0 KXXXXXX(兼容原来的ASCI)

> 110 表示的是 2 字符存储

    00000080-000007FF | 110 XXXXX10 KXXXXX

> 1110 表示的是 3 个字符存储

    0000 0800-0000 FFFF |  1110xxxx 10xxxxxx 10xxxxxx

> 11110 表示 4 个字符存储

    0001 0000-0010 FFFF |  11110xxx 10xxxxxx10xxxxxx 10xxxxxx

### 标准输入、输出流

System.in 标准的输入流 默认从键盘输入 类型是 InputStrean
System.out 标准的输出流 默认从控制台输出 类型是 PrintStream 但是他是 OutputStream 的子类

System.setIn System.setOut 方式可以重新指定输入和输出的流

```java
public static void setIn(InputStream in)
public static void setOut(PrintStream out)
```

#### 数据读取一行

> Scanner 操作

```java
/**
 * 读取一行数据的操作
 */
@Test
public void ScannerRead() {
    // System.in 代表从键盘读入
    Scanner scanner = new Scanner(System.in);
    String str = "";
    while (true) {
        str = scanner.next();
        if ("e".equals(str) || "exit".equals(str)) break;
        System.out.println(str);
    }
    scanner.close();
}
```

> InputStreamReader 操作

```java
@Test
public void InputStreamReaderTest() {
    InputStreamReader isr = new InputStreamReader(System.in);
    BufferedReader bf = new BufferedReader(isr);
    String str = "";
    try {
        while (true) {
            str = bf.readLine();
            // 更好避免空指针的问题
            if ("e".equals(str) || "exit".equals(str)) break;
            System.out.println(str);
        }
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        try {
            bf.close();
            isr.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 打印流

- System.out.println
- PrintStream

### 数据流

- DataInputStream
- DataOutputStream
  > 读取的顺序需要与写入的顺序一致

### 对象流

- ObjectInputStream 输入流
- ObjectOutputStream 输出流
  > 不能序列化`static` 和 `transient` 修饰的成员变量
  > 序列化： 将 JAVA 对象转换成与平台无关的二进制流

### Serializable

> 如果序列化一个对象 需要这个类实现 Serializable 接口 还需要声明 serivalVersionUID

```java
// 序列版本号
public static final long serivalVersionUID = 142L;
```

凡是实现 Serializable 接口的类都有一个表示序列化版木标识符的静态变量：

> private static final long serialVersionUlD;
> serialVersionUID 用来表明类的不同版本间的兼容性。简言之，其目的是以序列化对象
> 进行版本控制，有关各版本反序列化时是否兼容。
> 如果类没有显示定义这个静态常量，它的值是 Java 运行时环境根据类的内部细节自
> 动生成的。若类的实例变量做了修改，serialVersionUID 可能发生变化。故建议，
> 显式声明。
> 简单来说，Java 的序列化机制是通过在运行时判断类的 serialVersionUID 来验
> 证版木一致性的。在进行反序列化时，JVM 会把传来的字节流中的
> serialVersionUID 与木地相应实体类的 serialVersionUID 进行比较，如果相同
> 就认为是一致的，可以进行反序列化，否则就会出现序列化版木不一致的异
> 常。(InvalidCastException)

#### RandomAccessFile 类

可以作为输入流 也可以作为输出流
