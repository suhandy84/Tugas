class Product{
    constructor(namaproduk,hargaproduk,gambar){
        this.namaproduk=namaproduk,
        this.hargaproduk=hargaproduk,
        this.gambar=gambar
    }
}

var data=[
    new Product('Final Fantasy VII Remake',829000,'http://www.psegameshop.com/image/cache/catalog/cover%20Game/ps4%20/cover%20F/Final-Fantasy-VII-Remake_2019_09-24-19_027-500x500.jpg'),
    new Product('The Last of Us Part II',799000,'http://www.psegameshop.com/image/cache/catalog/cover%20Game/ps4%20/the-last-of-us-part-ii-501873.17-500x500.jpg'),
    new Product('Resident Evil 3 Remake',709000,'https://psegameshop.com/image/cache/catalog/Jimmy/2002/resident-evil-3-616151.14-500x500.jpg')
]

var cart=[]

const printdata=()=>{
    var output=''
    data.forEach((val,index)=>{
        output+=`<tr>
                    <td>${index+1}</td>
                    <td>${val.namaproduk}</td>
                    <td>${val.hargaproduk}</td>
                    <td><img src=${val.gambar} height='200px'></td>
                    <td><button onclick='clickaddtochart(${index})'>add to cart</button></td>
                </tr>`
    })
    document.getElementsByTagName('tbody')[0].innerHTML=output
}
printdata()

const printcart=()=>{
    var jumlahbelanja=0
    var totalbelanja=0
    var output=''
    cart.forEach((val,index)=>{
        output+=`<tr>
                    <td>${index+1}</td>
                    <td>${val.namaproduk}</td>
                    <td>${val.hargaproduk}</td>
                    <td><img src=${val.gambar} height='150px'></td>
                    <td><button onclick='clicktodelete(${index})'>delete from cart</button></td>
                </tr>`
                jumlahbelanja++
                totalbelanja+=val.hargaproduk
    })
    document.getElementsByTagName('tbody')[1].innerHTML=output
    if(jumlahbelanja==0){
        document.getElementsByTagName('h3')[0].innerHTML=`Belanjaan kamu kosong`
    }else{
        document.getElementsByTagName('h3')[0].innerHTML=`Belanjaan kamu ${jumlahbelanja}`
        document.getElementsByTagName('h4')[0].innerHTML=`Total belanjaan kamu sebesar Rp. ${totalbelanja}`
        document.getElementsByTagName('p')[0].innerHTML=`<button onclick='clicktocheckout(),timerbelanja()'>Checkout</button>`
    }
}
printcart()

const clickaddtochart=(index)=>{
    cart.push(data[index])
    printcart()
    console.log(cart.length)
}

const clicktodelete=(index)=>{
    var hapusbelanja=confirm(`Mau hapus game ${cart[index].namaproduk} dari belanjaan kamu?`)
    if(hapusbelanja){
        if(cart.length==1){
            document.getElementsByTagName('p')[0].innerHTML=''
            document.getElementsByTagName('h4')[0].innerHTML=''
        }
        cart.splice(index,1)  
        console.log(cart.length)      
    }
    printcart()
}

const clicktocheckout=()=>{
    document.getElementsByTagName('p')[2].innerHTML=`<input type="number" id="nominal" placeholder="masukkan nominal">&nbsp <button onclick='clicktobayar()'>Bayar</button>`
}

const clicktobayar=()=>{
    var totalcart=0
    for(var i=0;i<cart.length;i++){
        totalcart+=cart[i]['hargaproduk']
    }
    var kembali=(document.getElementById('nominal').value)-totalcart
    console.log(kembali)
    if(document.getElementById('nominal').value<totalcart){
        alert(`Uang kamu tidak cukup`)
    }else if(document.getElementById('nominal').value>totalcart){
        alert(`Uang kamu lebih, kembalian Rp ${kembali}\n\nTerimakasih sudah berbelanja di toko kami`)
        reset()
    }else{
        alert(`Terimakasih sudah berbelanja di toko kami`)
        reset()
        // cart=[]
        // printcart()
        // document.getElementsByTagName('h4')[0].innerHTML=``
        // document.getElementsByTagName('p')[0].innerHTML=``
        // clearInterval(waktuberjalan)
        // document.getElementsByTagName('p')[2].innerHTML=``
        // document.getElementsByTagName('p')[1].innerHTML=``
        // sisawaktu=20
    }
}

const reset=()=>{
    return cart=[],
    printcart(),
    document.getElementsByTagName('h4')[0].innerHTML=``,
    document.getElementsByTagName('p')[0].innerHTML=``,
    clearInterval(waktuberjalan),
    document.getElementsByTagName('p')[2].innerHTML=``,
    document.getElementsByTagName('p')[1].innerHTML=``,
    sisawaktu=20
}

var sisawaktu=20
var waktuberjalan

const timerbelanja=()=>{
    sisawaktu+=1
    waktuberjalan=setInterval(waktu,1000)
}

const waktu=()=>{
    sisawaktu--
    document.getElementsByTagName('p')[1].innerHTML=`waktu tersisa ${sisawaktu}`
    console.log(sisawaktu)
    if(sisawaktu<=-1){       
        alert(`waktu kamu habis`)
        reset()        
    }
}