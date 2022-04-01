import { RemovalPolicy } from "aws-cdk-lib";
import { AttributeType, BillingMode, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class SwnDatabase extends Construct {

    public readonly productTable: ITable;
    public readonly basketTable: ITable;

    constructor(scope: Construct, id: string) {
        super(scope, id);
      
         //product table
         this.productTable = this.createProductTable();
         //basket table
         this.basketTable = this.createBasketTable();
    }

    // Product DynamoDb Table Creation
    // product : PK: id -- name - description - imageFile - price - category
    private createProductTable() : ITable {
      const productTable = new Table(this, 'product', {
        partitionKey: {
          name: 'id',
          type: AttributeType.STRING
        },
        tableName: 'product',
        removalPolicy: RemovalPolicy.DESTROY,
        billingMode: BillingMode.PAY_PER_REQUEST
      });
      return productTable;
    }

    // Basket DynamoDb Table Creation
        // basket : PK: userName -- items (SET-MAP object) 
          // item1 - { quantity - color - price - productId - productName }
          // item2 - { quantity - color - price - productId - productName }
    private createBasketTable() : ITable {
      const basketTable = new Table(this, 'basket', {
        partitionKey: {
          name: 'userName',
          type: AttributeType.STRING,
        },
        tableName: 'basket',
        removalPolicy: RemovalPolicy.DESTROY,
        billingMode: BillingMode.PAY_PER_REQUEST
      });
      return basketTable;
    }

}

