package com.handy.aws.functions;

import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.google.gson.Gson;

public class InventoryUpdateFunction 
extends InventoryS3Client
implements RequestHandler<HttpRequest, HttpProductResponse> {

    @Override
    public HttpProductResponse handleRequest(HttpRequest request, Context context) {
        context.getLogger().log("Input: " + request);

        Gson gson = new Gson();
        String body = request.getBody();
        Product productToAdd = gson.fromJson(body, Product.class);
        
        List<Product> productList = getAllProductsList();
        productList.removeIf(prod -> prod.getId() == productToAdd.getId());
        
        HttpProductResponse httpResponse = new HttpProductResponse(productToAdd);
        
    	productList.add(productToAdd);
		if(!super.updateAllProducts(productList)) {
			httpResponse.setStatusCode("500");
		}

    	return httpResponse;
    }

}
