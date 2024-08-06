import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';

@Component({
  selector: 'app-view-request-xmls',
  standalone: true,
  imports: [],
  templateUrl: './view-request-xmls.component.html',
  styleUrl: './view-request-xmls.component.css'
})
export class ViewRequestXmlsComponent {

  /* We will create an endpoint in java which combines
  the xmls for the action into a string array and return the string array to this component */

  @Input({ required: true }) taskName!: string;
  @Output() closeButtonEvent = new EventEmitter<void>();
  private httpClient = inject(HttpClient);

  fileContents: string[] = [];
  endPointsUsed: string[] = [];

  ngOnInit(){

    this.endPointsUsed.push("/svcs-sapAdapter/ws/utilitiesDeviceERPSmartMeterCreateRequestOut");
    this.endPointsUsed.push("/svcs-sapAdapter/ws/utilitiesDeviceERPSmartMeterRegisterCreateRequestOut");
    this.endPointsUsed.push("/svcs-sapAdapter/ws/smartMeterMeterReadingDocumentERPResultCreateRequestOut");
    this.endPointsUsed.push("/svcs-sapAdapter/ws/utilitiesDeviceERPSmartMeterLocationNotificationOut");

    this.httpClient.get<string[]>('http://localhost:8080/meterAction/v1/getXmls').subscribe({
      next: (response) => {
        console.log("response is: " +response);
        this.fileContents = response;
      }
    });


    /* const step1 = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:n0=\"http://sap.com/xi/SAPGlobal20/Global\">" +
    "<soapenv:Header/>" +
    "<soapenv:Body>" +
    "<n0:UtilitiesDeviceERPSmartMeterCreateRequest>" +
    "<MessageHeader>" +
    "<UUID>{{UUID1}}</UUID>" +
    "<CreationDateTime> {{creationDateTime}} </CreationDateTime>" +
    "<SenderBusinessSystemID>{{SenderID}}</SenderBusinessSystemID>" +
    "<RecipientBusinessSystemID>MDMSYSTEM</RecipientBusinessSystemID>" +
    "</MessageHeader>" +
    "<UtilitiesDevice>" +
    "<ID>{{CIS_METER_NUMBER()}}</ID>" +
    "<StartDate>{{StartDateTime}}</StartDate>" +
    "<EndDate>{{EndDate}} </EndDate>" +
    "<SerialID>{{AMI_METER_NUMBER()}}</SerialID>" +
    "<MaterialID>E1_RLM_LAG_60</MaterialID>" +
    "<IndividualMaterialManufacturerInformation>" +
    "<PartyInternalID>Landis+Gyr</PartyInternalID>" +
    "<SerialID>{{SERIAL_NUMBER()}}</SerialID>" +
    "</IndividualMaterialManufacturerInformation>" +
    "<SmartMeter>" +
    "<UtilitiesAdvancedMeteringSystemID>{{PROVIDER}}</UtilitiesAdvancedMeteringSystemID>" +
    "</SmartMeter>" +
    "</UtilitiesDevice>" +
    "</n0:UtilitiesDeviceERPSmartMeterCreateRequest>" +
    "</soapenv:Body>" +
    "</soapenv:Envelope>"

  const step2 = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:glob=\"http://sap.com/xi/SAPGlobal20/Global\">" +
    "<soapenv:Header/>" +
    "<soapenv:Body>" +
    "<glob:UtilitiesDeviceERPSmartMeterRegisterCreateRequest>" +
    "<MessageHeader>" +
    "<UUID>{{UUID2()}}</UUID>" +
    "<CreationDateTime>{{creationDateTime}}</CreationDateTime>" +
    "<SenderBusinessSystemID>{{SenderID}}</SenderBusinessSystemID>" +
    "</MessageHeader>" +
    "<UtilitiesDevice>" +
    "<ID>{{CIS_METER_NUMBER()}}</ID>" +
    "<RegisterGroup>" +
    "<StartDate>{{StartDateTime}}</StartDate>" +
    "<EndDate>{{EndDate()}}</EndDate>" +
    "<RegisterGroupID>12</RegisterGroupID>" +
    "</RegisterGroup>" +
    "<Register>" +
    "<StartDate>{{StartDateTime}}</StartDate>" +
    "<EndDate>{{EndDate()}}</EndDate>" +
    "<UtilitiesMeasurementTaskID>{{MEASUREMENT_TASK_ID()}}</UtilitiesMeasurementTaskID>" +
    "<UtilitiesObjectIdentificationSystemCodeText>{{OBIS()}}</UtilitiesObjectIdentificationSystemCodeText>" +
    "<UtiltiesMeasurementTaskCategoryCode>5</UtiltiesMeasurementTaskCategoryCode>" +
    "<UtilitiesDivisionCategoryCode>1</UtilitiesDivisionCategoryCode>" +
    "<TimeZoneCode>EST</TimeZoneCode>" +
    "<Specifications>" +
    "<MeasureUnitCode>KWH</MeasureUnitCode>" +
    "<DecimalValuePrecision>" +
    "<TotalDigitNumberValue>8</TotalDigitNumberValue>" +
    "<FractionDigitNumberValue>3</FractionDigitNumberValue>" +
    "</DecimalValuePrecision>" +
    "<MeterReadingResultAdjustmentFactorValue>1.0</MeterReadingResultAdjustmentFactorValue>" +
    "<UtilitiesMeasurementTaskValidationProfileCode>1101</UtilitiesMeasurementTaskValidationProfileCode>" +
    "</Specifications>" +
    "</Register>" +
    "<Register>" +
    "<StartDate>{{StartDateTime}}</StartDate>" +
    "<EndDate>{{EndDate()}}</EndDate>" +
    "<UtilitiesMeasurementTaskID>{{MEASUREMENT_TASK_ID2()}}</UtilitiesMeasurementTaskID>" +
    "<UtilitiesObjectIdentificationSystemCodeText>{{OBIS2()}}</UtilitiesObjectIdentificationSystemCodeText>" +
    "<UtiltiesMeasurementTaskCategoryCode>4</UtiltiesMeasurementTaskCategoryCode>" +
    "<UtilitiesDivisionCategoryCode>1</UtilitiesDivisionCategoryCode>" +
    "<UtilitiesMeasurementRecurrenceCode>05</UtilitiesMeasurementRecurrenceCode>" +
    "<TimeZoneCode>EST</TimeZoneCode>" +
    "<Specifications>" +
    "<MeasureUnitCode>KWH</MeasureUnitCode>" +
    "<DecimalValuePrecision>" +
    "<TotalDigitNumberValue>8</TotalDigitNumberValue>" +
    "<FractionDigitNumberValue>3</FractionDigitNumberValue>" +
    "</DecimalValuePrecision>" +
    "<MeterReadingResultAdjustmentFactorValue>1.0</MeterReadingResultAdjustmentFactorValue>" +
    "<UtilitiesMeasurementTaskValidationProfileCode>1101</UtilitiesMeasurementTaskValidationProfileCode>" +
    "</Specifications>" +
    "</Register>" +
    "<SmartMeter>" +
    "<UtilitiesAdvancedMeteringSystemID>{{PROVIDER()}}</UtilitiesAdvancedMeteringSystemID>" +
    "</SmartMeter>" +
    "</UtilitiesDevice>" +
    "</glob:UtilitiesDeviceERPSmartMeterRegisterCreateRequest>" +
    "</soapenv:Body>" +
    "</soapenv:Envelope>";

  const step3 = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:glob=\"http://sap.com/xi/SAPGlobal20/Global\">" +
    "<soapenv:Header/>" +
    "<soapenv:Body>" +
    "<glob:SmartMeterMeterReadingDocumentERPResultCreateRequest>" +
    "<MessageHeader>" +
    "<UUID>{{UUID3}}</UUID>" +
    "<CreationDateTime>{{creationDateTime}}</CreationDateTime>" +
    "<SenderBusinessSystemID>{{SenderID}}</SenderBusinessSystemID>" +
    "</MessageHeader>" +
    "<MeterReadingDocument>" +
    "<ID>{{MeterReadingDocument()}}</ID>" +
    "<MeterReadingReasonCode>8</MeterReadingReasonCode>" +
    "<UtilitiesMeasurementTask>" +
    "<UtilitiesMeasurementTaskID>{{MEASUREMENT_TASK_ID}}</UtilitiesMeasurementTaskID>" +
    "<UtilitiesDevice>" +
    "<UtilitiesDeviceID>{{CIS_METER_NUMBER}}</UtilitiesDeviceID>" +
    "<SmartMeter>" +
    "<UtilitiesAdvancedMeteringSystemID>{{PROVIDER}}</UtilitiesAdvancedMeteringSystemID>" +
    "</SmartMeter>" +
    "</UtilitiesDevice>" +
    "</UtilitiesMeasurementTask>" +
    "<Result>" +
    "<MeterReadingDate>{{StartDateTime}}</MeterReadingDate>" +
    "<MeterReadingTime>00:00:00</MeterReadingTime>" +
    "<ActualMeterReadingDate>{{StartDateTime}}</ActualMeterReadingDate>" +
    "<ActualMeterReadingTime>00:00:00</ActualMeterReadingTime>" +
    "<MeterReadingTypeCode>1</MeterReadingTypeCode>" +
    "<MeterReadingResultValue>100</MeterReadingResultValue>" +
    "</Result>" +
    "</MeterReadingDocument>" +
    "</glob:SmartMeterMeterReadingDocumentERPResultCreateRequest>" +
    "</soapenv:Body>" +
    "</soapenv:Envelope>";

  const step4 = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:n0=\"http://sap.com/xi/SAPGlobal20/Global\" xmlns:prx=\"urn:sap.com:proxy:GSB:/1SAI/TAS251706B30E6C816C5B25:740\">" +
    "<soapenv:Header/>" +
    "<soapenv:Body>" +
    "<n0:UtilitiesDeviceERPSmartMeterLocationNotification>" +
    "<MessageHeader>" +
    "<UUID>{{UUID4()}}</UUID>" +
    "<CreationDateTime>{{creationDateTime}}</CreationDateTime>" +
    "<SenderBusinessSystemID>{{SenderID}}</SenderBusinessSystemID>" +
    "</MessageHeader>" +
    "<UtilitiesDevice logicalLocationListCompleteTransmissionIndicator=\"true\" locationListCompleteTransmissionIndicator=\"true\">" +
    "<ID>{{CIS_METER_NUMBER}}</ID>" +
    "<LogicalLocation>" +
    "<StartDate>{{StartDateTime}}</StartDate>" +
    "<EndDate>{{EndDate}}</EndDate>" +
    "<LogicalInstallationPointID>{{LogicalLocation}}</LogicalInstallationPointID>" +
    "</LogicalLocation>" +
    "<Location>" +
    "<StartDate>{{StartDateTime}}</StartDate>" +
    "<EndDate>{{EndDate()}}</EndDate>" +
    "<InstallationPointID>{{LogicalLocation}}</InstallationPointID>" +
    "<InstallationPointAddressInformation>" +
    "<HouseID>26</HouseID>" +
    "<StreetPostalCode>2830</StreetPostalCode>" +
    "<CityName>virum</CityName>" +
    "<StreetName>Teknikerbyen</StreetName>" +
    "<CountryCode>DK</CountryCode>" +
    "<TimeZoneCode>EST</TimeZoneCode>" +
    "</InstallationPointAddressInformation>" +
    "<InstallationPointHierarchyRelationship>" +
    "<ParentInstallationPointID>{{Premise_id}}</ParentInstallationPointID>" +
    "</InstallationPointHierarchyRelationship>" +
    "<ModificationInformation>" +
    "<InstallationDate>{{StartDateTime}}</InstallationDate>" +
    "<InstallationTime>{{StartTime}}</InstallationTime>" +
    "<TimeZoneCode>EST</TimeZoneCode>" +
    "</ModificationInformation>" +
    "</Location>" +
    "<SmartMeter>" +
    "<UtilitiesAdvancedMeteringSystemID>{{PROVIDER()}}</UtilitiesAdvancedMeteringSystemID>" +
    "</SmartMeter>" +
    "</UtilitiesDevice>" +
    "</n0:UtilitiesDeviceERPSmartMeterLocationNotification>" +
    "</soapenv:Body>" +
    "</soapenv:Envelope>";

    this.fileContents.push(step1);
    this.fileContents.push(step2);
    this.fileContents.push(step3);
    this.fileContents.push(step4);
 */
  }

  onCloseButton(){
    this.closeButtonEvent.emit();
  }

}
