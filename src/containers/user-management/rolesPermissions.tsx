import {Row, PageHeader, Col, Form, Select, Checkbox, Button} from 'antd';
import {Main} from "@styles/auth-info-style";
import {Cards} from "@components/cards/frame/cards-frame";
import { useRolesQuery } from "@redux/services/utilities/api";
import {useEffect, useState} from "react";
import {usePermissionsQuery, useSavePermissionsMutation} from "@redux/services/user-management/roles-permissions/api";
import {Scope} from "@utils/scope";

const RolesPermissions = () => {

    type StateType = {
        checked: any[];
        permissions: any[];
        roleId: string;
    };

    const [state, setState] = useState<StateType>({
        checked: [],
        permissions: [],
        roleId: '',
    });

    const roles = useRolesQuery("", {refetchOnMountOrArgChange: true});
    const {data, isLoading} = usePermissionsQuery(state.roleId, {skip: !state.roleId, refetchOnMountOrArgChange: true});
    const [savePermissions, savePermissionsParams] = useSavePermissionsMutation();

    const handleChange = (value: any) => {
        setState({
            ...state,
            roleId: value
        })
    }

    useEffect(() =>{
        if(data?.data){
            let arr: any[] = [];
            data?.data?.forEach((permission:any) => [...arr, ...permission.checked]);
            // @ts-ignore
            setState({...state, checked: arr, permissions: data?.data })
        }
    },[data?.data])

    const multipleChange = (checked: any[], permissions: any[], permissionIndex: number) => {
        let permissionChecked: any[] = [];
        let statePermissions = [...state.permissions];

        const updatedPermission = { ...statePermissions[permissionIndex], checked };
        statePermissions[permissionIndex] = updatedPermission;
        statePermissions[permissionIndex].checked = checked;

        statePermissions.forEach((permission) => permissionChecked = [...permissionChecked, ...permission.checked]);
        setState({ ...state, permissions: statePermissions, checked: permissionChecked });
    };

    const setRolesPermissions = (permissions : any[]) => {
        const data = {roleId: state.roleId, permissions}
        savePermissions({data});
    };

    return (
        <>
            <PageHeader ghost title="Roles Permissions" />
            <Main>
                <Row>
                    <Col md={24} sm={24} xs={24}>
                        <Cards headless={true}>
                            <Row>
                                <Col span={12}>
                                    <Form>
                                        <Form.Item
                                            name="role"
                                            initialValue={''}
                                            label="Select Role">
                                            <Select onChange={handleChange} loading={roles?.isLoading}>
                                                {roles?.data?.data.map((data:any) => <Select.Option value={data._id} key={data._id}>{data.name}</Select.Option>)}
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                        </Cards>
                        {state.permissions && state.permissions.length > 0 ? (
                            <Cards title={'Permissions'}>
                                {state.permissions.map((data, index) => (
                                    <div key={index}>
                                        {index !== 0 ? <><br/><br/></> : ''}
                                        <div style={{ borderBottom: '1px solid #E9E9E9', marginBottom: '10px'}}>
                                            <Checkbox
                                                indeterminate={data.checked.length && data.checked.length < data.permissions.length}
                                                onChange={(event) => multipleChange((data.permissions.length === data.checked.length ? [] : data.permissions.map((el:any) => el.value)), data.permissions, index)}
                                                checked={data.checked.length === data.permissions.length}
                                            >
                                                {data.group}
                                            </Checkbox>
                                        </div>

                                        <Checkbox.Group
                                            options={data.permissions}
                                            value={data.checked}
                                            onChange={(event) => multipleChange(event, data.permissions, index)} />
                                    </div>
                                ))}
                                {Scope.checkScopes(['um_roles_permissions_update']) && (
                                    <div className="text-right">
                                        <br/>
                                        <Button
                                            type="primary"
                                            htmlType="button"
                                            onClick={() => setRolesPermissions(state.checked)}
                                            disabled={isLoading}>
                                            {isLoading ? 'Loading...' : 'Submit'}
                                        </Button>
                                    </div>
                                )}
                            </Cards>
                        ) : ''}
                    </Col>
                </Row>
            </Main>
        </>
    )
}
export default RolesPermissions