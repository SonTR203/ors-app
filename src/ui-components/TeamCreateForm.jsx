/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Team } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function TeamCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    founded: "",
    home_colour: "",
    away_colour: "",
    team_picture: "",
    captains: [],
    sport: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [founded, setFounded] = React.useState(initialValues.founded);
  const [home_colour, setHome_colour] = React.useState(
    initialValues.home_colour
  );
  const [away_colour, setAway_colour] = React.useState(
    initialValues.away_colour
  );
  const [team_picture, setTeam_picture] = React.useState(
    initialValues.team_picture
  );
  const [captains, setCaptains] = React.useState(initialValues.captains);
  const [sport, setSport] = React.useState(initialValues.sport);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setFounded(initialValues.founded);
    setHome_colour(initialValues.home_colour);
    setAway_colour(initialValues.away_colour);
    setTeam_picture(initialValues.team_picture);
    setCaptains(initialValues.captains);
    setCurrentCaptainsValue("");
    setSport(initialValues.sport);
    setErrors({});
  };
  const [currentCaptainsValue, setCurrentCaptainsValue] = React.useState("");
  const captainsRef = React.createRef();
  const validations = {
    name: [],
    founded: [],
    home_colour: [],
    away_colour: [],
    team_picture: [],
    captains: [],
    sport: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          founded,
          home_colour,
          away_colour,
          team_picture,
          captains,
          sport,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Team(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "TeamCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              founded,
              home_colour,
              away_colour,
              team_picture,
              captains,
              sport,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Founded"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={founded && convertToLocal(new Date(founded))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              name,
              founded: value,
              home_colour,
              away_colour,
              team_picture,
              captains,
              sport,
            };
            const result = onChange(modelFields);
            value = result?.founded ?? value;
          }
          if (errors.founded?.hasError) {
            runValidationTasks("founded", value);
          }
          setFounded(value);
        }}
        onBlur={() => runValidationTasks("founded", founded)}
        errorMessage={errors.founded?.errorMessage}
        hasError={errors.founded?.hasError}
        {...getOverrideProps(overrides, "founded")}
      ></TextField>
      <TextField
        label="Home colour"
        isRequired={false}
        isReadOnly={false}
        value={home_colour}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              founded,
              home_colour: value,
              away_colour,
              team_picture,
              captains,
              sport,
            };
            const result = onChange(modelFields);
            value = result?.home_colour ?? value;
          }
          if (errors.home_colour?.hasError) {
            runValidationTasks("home_colour", value);
          }
          setHome_colour(value);
        }}
        onBlur={() => runValidationTasks("home_colour", home_colour)}
        errorMessage={errors.home_colour?.errorMessage}
        hasError={errors.home_colour?.hasError}
        {...getOverrideProps(overrides, "home_colour")}
      ></TextField>
      <TextField
        label="Away colour"
        isRequired={false}
        isReadOnly={false}
        value={away_colour}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              founded,
              home_colour,
              away_colour: value,
              team_picture,
              captains,
              sport,
            };
            const result = onChange(modelFields);
            value = result?.away_colour ?? value;
          }
          if (errors.away_colour?.hasError) {
            runValidationTasks("away_colour", value);
          }
          setAway_colour(value);
        }}
        onBlur={() => runValidationTasks("away_colour", away_colour)}
        errorMessage={errors.away_colour?.errorMessage}
        hasError={errors.away_colour?.hasError}
        {...getOverrideProps(overrides, "away_colour")}
      ></TextField>
      <TextField
        label="Team picture"
        isRequired={false}
        isReadOnly={false}
        value={team_picture}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              founded,
              home_colour,
              away_colour,
              team_picture: value,
              captains,
              sport,
            };
            const result = onChange(modelFields);
            value = result?.team_picture ?? value;
          }
          if (errors.team_picture?.hasError) {
            runValidationTasks("team_picture", value);
          }
          setTeam_picture(value);
        }}
        onBlur={() => runValidationTasks("team_picture", team_picture)}
        errorMessage={errors.team_picture?.errorMessage}
        hasError={errors.team_picture?.hasError}
        {...getOverrideProps(overrides, "team_picture")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              founded,
              home_colour,
              away_colour,
              team_picture,
              captains: values,
              sport,
            };
            const result = onChange(modelFields);
            values = result?.captains ?? values;
          }
          setCaptains(values);
          setCurrentCaptainsValue("");
        }}
        currentFieldValue={currentCaptainsValue}
        label={"Captains"}
        items={captains}
        hasError={errors?.captains?.hasError}
        errorMessage={errors?.captains?.errorMessage}
        setFieldValue={setCurrentCaptainsValue}
        inputFieldRef={captainsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Captains"
          isRequired={false}
          isReadOnly={false}
          value={currentCaptainsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.captains?.hasError) {
              runValidationTasks("captains", value);
            }
            setCurrentCaptainsValue(value);
          }}
          onBlur={() => runValidationTasks("captains", currentCaptainsValue)}
          errorMessage={errors.captains?.errorMessage}
          hasError={errors.captains?.hasError}
          ref={captainsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "captains")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Sport"
        isRequired={false}
        isReadOnly={false}
        value={sport}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              founded,
              home_colour,
              away_colour,
              team_picture,
              captains,
              sport: value,
            };
            const result = onChange(modelFields);
            value = result?.sport ?? value;
          }
          if (errors.sport?.hasError) {
            runValidationTasks("sport", value);
          }
          setSport(value);
        }}
        onBlur={() => runValidationTasks("sport", sport)}
        errorMessage={errors.sport?.errorMessage}
        hasError={errors.sport?.hasError}
        {...getOverrideProps(overrides, "sport")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
