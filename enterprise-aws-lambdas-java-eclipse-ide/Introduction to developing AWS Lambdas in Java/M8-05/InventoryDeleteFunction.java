package com.handy.aws.functions;

import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class InventoryDeleteFunction 
extends InventoryS3Client
implements RequestHandler<HttpRequest, HttpProductResponse> {

    @Override
    public HttpProductResponse handleRequest(HttpRequest request, Context context) {
        context.getLogger().log("Input: " + request);
        
        String idAsString = (String)request.pathParameters.get("id");
        Integer productId = Integer.parseInt(idAsString); 
        
        List<Product> productList = getAllProductsList();
        
        boolean didRemove = productList.removeIf(prod -> prod.getId() == productId);
        
        if(didRemove) {
        	if(updateAllProducts(productList)) {
        		return new HttpProductResponse();
        	}
        }
        HttpProductResponse response = new HttpProductResponse();
        response.setStatusCode("404");
		return response;

    }

}
