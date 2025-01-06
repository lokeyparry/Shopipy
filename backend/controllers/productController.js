import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModels.js';

const addProduct = async(req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, popular } = req.body
        const image1 = req.files ?.image1 ?.[0];
        const image2 = req.files ?.image2 ?.[0];
        const image3 = req.files ?.image3 ?.[0];
        const image4 = req.files ?.image4 ?.[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)
            // upload image to cloudinary
        let imagesUrl;
        if (images.length > 0) {
            imagesUrl = await Promise.all(
                images.map(async(item) => {
                    const result = await cloudinary.uploader.upload(item.path, { resourses_type: 'image' })
                    return result.secure_url
                })
            )
        } else {
            imagesUrl = ["https://via.placeholder.com/150"]
        }

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: sizes ? JSON.parse(sizes) : [],
            popular: popular == 'true' ? true : false,
            image: imagesUrl,
            date: Date.now()
        }
        console.log(productData);

        const product = new productModel(productData)
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error Occurred" })

    }
}

const removeProduct = async(req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error Occurred" })
    }
}

const singleProduct = async(req,res) => {
    try {
        const {productId}=req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error Occurred" })
        
    }
}

const listProduct = async(req, res) => {
    try {
        const products = await productModel.find({})
        res.json({ success: true, products })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error Occurred" })
    }
}


export { addProduct, removeProduct, singleProduct, listProduct }