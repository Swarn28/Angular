import { Injectable } from "@angular/core";
import { UserType } from "./UserTypeEnum";
import { Script } from "../view-scripts/script.model";
import { ScriptAdditionalProps } from "../about-script/scriptAdditionalProperties.model";

@Injectable({providedIn:'root'})
export class SharedService{

  private currentUserType!: UserType;
  private selectedScript!: Script;
  private selectedScriptProp!: ScriptAdditionalProps;


  setCurrentUserType(userType: UserType){
    this.currentUserType = userType;
  }

  getCurrentUserType():UserType{
    return this.currentUserType;
  }

  getSelectedScript(): Script{
    return this.selectedScript;
  }

  setSelectedScript(selScript: Script){
    this.selectedScript = selScript;
  }

  getSelectedScriptProp(): ScriptAdditionalProps {
    return this.selectedScriptProp;
  }
  setSelectedScriptProp(value: ScriptAdditionalProps) {
    this.selectedScriptProp = value;
  }

}
