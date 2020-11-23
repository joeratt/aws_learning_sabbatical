package com.handy.aws.functions;

import com.amazonaws.services.lambda.runtime.Context;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.core.ResponseInputStream;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import com.amazonaws.services.lambda.runtime.RequestHandler;

import com.google.gson.Gson;
import java.util.List;

public class InventoryFindFunction 
extends InventoryS3Client
implements RequestHandler<HttpQuerystringRequest, HttpProductResponse> {

    @Override
    public HttpProductResponse handleRequest(HttpQuerystringRequest request, Context context) {
        context.getLogger().log("Input: " + request);
        
        String idAsString = (String)request.getQueryStringParameters().get("id");  
        
        if(idAsString.equalsIgnoreCase("all")) {  
        	Product [] products = getAllProducts();
        	HttpProductResponse response = new HttpProductResponse(products);
        	
    		return response;
        }
        Integer productId = Integer.parseInt(idAsString);  
        
        Product product = getProductById(productId);
            
        return new HttpProductResponse(product);
    }

    private Product getProductById(int prodId) {
    	
    	Product [] products = getAllProducts();
		
		for(Product prod : products) {
			if(prod.getId()==prodId) {
				return prod;
			}
		}
		
		return null;
	}

}
