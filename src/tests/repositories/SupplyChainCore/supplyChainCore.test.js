const UserModel = require('../../../endPoints/auth/models/User/authModels');
const ProductModel = require('../../../endPoints/E-commerceFeatures/productManagement/models/productModel')
const CooperativeModel = require('../../../endPoints/supplyChainCore/cooperativeManagement&Collection/models/Cooperatives/cooperativeModel')
const BatchModel = require('../../../endPoints/supplyChainCore/cooperativeManagement&Collection/models/Batches/batchModel')
const DeliveryModel = require('../../../endPoints/supplyChainCore/cooperativeManagement&Collection/models/Deliveries/deliveryModel')

const QualityReportModel = require('../../../endPoints/supplyChainCore/processingAndQualityControl/models/processingModels')

const DocumentModel = require('../../../endPoints/supplyChainCore/exportOperations/models/Documents/documentModel')
const ExportOrdermodel = require('../../../endPoints/supplyChainCore/exportOperations/models/ExportOrders/exportOrderModel')
const ShipmentModel = require('../../../endPoints/supplyChainCore/importOperations/models/Shipments/shipmentModel')
const WareHouseInventoryModel = require('../../../endPoints/supplyChainCore/importOperations/models/WarehouseInventory/warehouseInventoryModel')


const { initDb,
  create,
  findAll,
  findById,
  update,
  remove } = require('../../base/baseTest');

beforeAll(async () => {
    const tablesSql = [
        UserModel.getCreateTableQuery(),
        CooperativeModel.getCreateTableQuery(),
        BatchModel.getCreateTableQuery(),
        DeliveryModel.getCreateTableQuery(),
        QualityReportModel.getCreateTableQuery(),
        ExportOrdermodel.getCreateTableQuery(),
        DocumentModel.getCreateTableQuery(),
        ShipmentModel.getCreateTableQuery(),
        ProductModel.getCreateTableQuery(),
        WareHouseInventoryModel.getCreateTableQuery()
    ]
    .map(sql => sql.trim().replace(/};?$/, ';'))
      .join('\n');
  await initDb(tablesSql);
})


describe('🧱 Cooperative Management', () => {
  let cooperativeId, batchId, deliveryId;

  test('Create Cooperative', async () => {
    cooperative = await create('cooperatives', {
      name: 'Kibinge Cooperative',
      location: 'Kiambu',
      cooperative_type: 'Estate',
      farmer_count: 200,
    });
    cooperativeId = cooperative.id
    expect(cooperative.name).toBe('Kibinge Cooperative');
  });

  test('Create Batch linked to Cooperative', async () => {
    batch = await create('batches', {
      cooperative_id: cooperativeId,
      batch_code: 'BATCH001',
      grade: 'AA',
      weight_kg: 1200,
    });
    batchId = batch.id
    expect(batch.batch_code).toBe('BATCH001');
  });

  test('Create Delivery linked to Batch & Cooperative', async () => {
    delivery = await create('deliveries', {
      cooperative_id: cooperativeId,
      batch_id: batchId,
      weight_kg: 500,
      cherry_grade: 'A+',
    });
    deliveryId = delivery.id
    expect(delivery.weight_kg).toBe(500);
  });

  test('Update Cooperative farmer_count', async () => {
    const updated = await update('cooperatives', cooperativeId, { farmer_count: 250 });
    expect(updated.farmer_count).toBe(250);
  });

  test('Find All Cooperatives', async () => {
    const all = await findAll('cooperatives');
    expect(all.length).toBeGreaterThan(0);
  });

  test('Find Batch By ID', async () => {
    const found = await findById('batches', batchId);
    expect(found.batch_code).toBe('BATCH001');
  });

  test('Delete Delivery', async () => {
    const deleted = await remove('deliveries', deliveryId);
    expect(deleted.id).toBe(delivery.id);
  });
});

describe('🧪 Quality Reports', () => {
  let graderId, graderName, reportId;

  test('Create Grader User', async () => {
    grader = await create('users', {
      full_name: 'Alice Grader',
      email: 'alice@example.com',
      role: 'grader',
    });
    graderId = grader.id
    graderName = grader.full_name
    expect(grader.role).toBe('grader');
  });

  test('Create Quality Report linked to Batch & Grader', async () => {
    batch = await findAll('batches');
    report = await create('quality_reports', {
      batch_id: batch[0].id,
      inspector_name: graderName,
      quality_grade: 'AA'
    });
    expect(report.inspector_name).toBe(graderName);
  });
});

describe('🚢 Export Operations', () => {
  let buyerId, exportOrderId, documentId, shipmentId;

  test('Create Export Order', async () => {
    const batch = await findAll('batches');
    const user = await findAll('users');
    buyerId = user[0].id
    exportOrder = await create('export_orders', {
      batch_id: batch[0].id,
      destination: 'Hamburg, Germany',
      quantity_kg: 1000
    });
    exportOrderId = exportOrder.id
    expect(exportOrder.destination).toBe('Hamburg, Germany');
  });

  test('Attach Document to Export', async () => {
    document = await create('documents', {
      export_id: exportOrderId,
      document_type: 'certificate',
      file_path: 'https://example.com/cert.pdf',
    });
    documentId = document.id
    expect(document.document_type).toBe('certificate');
  });

  test('Create Shipment for Export', async () => {
    shipment = await create('shipments', {
      export_id: exportOrderId,
      tracking_number: 'TRK12345',
    });
    shipmentId = shipment.id
    expect(shipment.status).toBe('in_transit');
  });
});

describe('📦 Warehouse Inventory & Products', () => {
  let productId, inventoryId;

  test('Create Product', async () => {
    product = await create('products', {
      name: 'Arabica Coffee',
      price_per_kg: 5.5,
      stock: 1000,
      grade: 'AA',
      origin: 'Kenya',
      cupping_score: 88,
    });
    productId = product.id
    expect(product.name).toBe('Arabica Coffee');
  });

  test('Add Product to Warehouse Inventory', async () => {
    const shipment = await findAll('shipments');
    inventory = await create('warehouse_inventory', {
      shipment_id: shipment[0].id,
      product_id: productId,
      quantity: 100,
      location: 'Warehouse A',
    });
    inventoryId = inventory.id
    expect(inventory.status).toBe('available');
  });
});


